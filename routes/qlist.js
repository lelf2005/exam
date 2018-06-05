var express = require('express');
var router = express.Router();
var config = require('../config/config');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var filebuffer = fs.readFileSync(config.db_path);
var moment = require('moment');


router.post('/qlist*', function (req, res, next) {

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'SELECT id,item,type,rank FROM questions where isdel=0';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        res.json({ "data": rows });
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });

});

router.post('/qadd*', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
    var qtype = req.body.qtype;
    var qrank = req.body.qrank;
    var question = req.body.question;
    var answer = req.body.answer;
    var solution = req.body.solution;
    var tags = req.body.tags;
    var curdate = moment().format('YYYY-MM-DD HH:mm:ss');

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'INSERT INTO questions (item, answer,solution,rank,type,created_by,created_time,updated_by,updated_time) VALUES(?,?,?,?,?,?,?,?,?)';

    db.run(sql, [question, answer, solution, qrank, qtype, req.session.username, curdate, req.session.username, curdate], function (err) {
        if (err) {
            result = {
                code: 400,
                msg: '添加失败'
            };
            res.json(result);
            throw err;
        } else {
            if (tags != "") {
                var arr_tags = tags.split(",");
                var placeholders = arr_tags.map((tag) => '(' + this.lastID + ',?)').join(',');
                sql = 'INSERT INTO tags(qid,tag) VALUES ' + placeholders;

                db.run(sql, arr_tags, function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log(`Rows inserted ${this.changes}`);
                });
            }

            result = {
                code: 200,
                msg: '添加成功'
            };
            res.json(result);
        }
    });
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });

});

router.post('/qupdate*', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
    var qid = req.body.qid;
    var qtype = req.body.qtype;
    var qrank = req.body.qrank;
    var question = req.body.question;
    var answer = req.body.answer;
    var solution = req.body.solution;
    var tags = req.body.tags;
    var curdate = moment().format('YYYY-MM-DD HH:mm:ss');
    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'update questions set item = ?,answer=?,solution=?,rank=?,type=?,updated_by=?,updated_time=? where id=?'

    db.run(sql, [question, answer, solution, qrank, qtype, req.session.username, curdate, qid], function (err) {
        if (err) {
            result = {
                code: 400,
                msg: '修改失败'
            };
            res.json(result);
            throw err;
        } else {
            db.run('delete from tags where qid=' + qid);
            if (tags != "") {
                var arr_tags = tags.split(",");
                var placeholders = arr_tags.map((tag) => '(' + qid + ',?)').join(',');
                sql = 'INSERT INTO tags(qid,tag) VALUES ' + placeholders;

                db.run(sql, arr_tags, function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log(`Rows inserted ${this.changes}`);
                });
            }


            result = {
                code: 200,
                msg: '修改成功'
            };
            res.json(result);
        }
    });
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });

});

router.post('/qdel*', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
    var qid = req.body.qid;
    var curdate = moment().format('YYYY-MM-DD HH:mm:ss');

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'update questions set isdel = 1 where id=?';

    db.run(sql, [qid], function (err) {
        if (err) {
            result = {
                code: 400,
                msg: '删除失败'
            };
            res.json(result);
            throw err;
        } else {
            db.run('delete from tags where qid=' + qid);
            result = {
                code: 200,
                msg: '删除成功'
            };
            res.json(result);
        }
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });
});

router.post('/qinfo*', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
    var qid = req.body.qid;

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'SELECT * FROM questions where isdel=0 and id=?';

    db.get(sql, [qid], (err, row) => {
        if (err) {
            result = {
                code: 400,
                msg: '查询失败'
            };
            res.json(result);
        } else {
            //sql = 'SELECT group_concat( tag ) as tags FROM tags WHERE qid= ?';
            sql = 'SELECT id,tag FROM tags WHERE qid= ?';
            db.all(sql, [qid], (err, tags_row) => {
                if (err) {
                    result = {
                        code: 400,
                        msg: '查询失败'
                    };
                    res.json(result);
                } else {
                    result = {
                        code: 200,
                        msg: '查询成功',
                        qtype: row.type,
                        qrank: row.rank,
                        item: row.item,
                        answer: row.answer,
                        solution: row.solution,
                        tags:{ "tags": tags_row }
                    };
                    res.json(result);
                }
            });
            
        }
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });

});

router.get('/tags*', function (req, res, next) {
    var q = req.query.q;

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'select id, tag as text from tags group by tag';
    if (q != undefined) {
        sql = 'select id, tag as text from tags where tag like "%' + q + '%" group by tag ';
    }
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        res.json({ "results": rows });
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });

});
module.exports = router;