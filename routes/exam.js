var express = require('express');
var router = express.Router();
var config = require('../config/config');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var filebuffer = fs.readFileSync(config.db_path);
var moment = require('moment');

router.post('/examlist*', function (req, res, next) {

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'SELECT id,name FROM exam where isdel=0';

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

router.post('/exam_info*', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
    var examid = req.body.exam_id;
    var qids = "";

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'SELECT name,qids,content FROM exam where id=?';

    db.get(sql, [examid], (err, row) => {
        if (err) {
            throw err;
        } else {
            result = {
                code: 200,
                msg: '查询成功',
                name: row.name,
                content: row.content,
                qids: row.qids
            };

            qids = row.qids;
            sql = "select id as seq,id, item,type, rank from questions where id in (" + qids + ") and isdel=0";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    throw err;
                }
                result["data"] = rows;
                //res.json({ "data": rows });
                res.json(result);
            });
        }
    });




    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });

});

router.post('/examdel', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
    var examid = req.body.examid;
    var curdate = moment().format('YYYY-MM-DD HH:mm:ss');

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'update exam set isdel = 1 where id=?';

    db.run(sql, [examid], function (err) {
        if (err) {
            result = {
                code: 400,
                msg: '删除失败'
            };
            res.json(result);
            throw err;
        } else {
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

router.post('/exam_add', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
    var name = req.body.name;
    var qids = req.body.qids;
    var content = req.body.content;
    var curdate = moment().format('YYYY-MM-DD HH:mm:ss');

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'INSERT INTO exam (name, qids,content,created_by,created_time,updated_by,updated_time) VALUES(?,?,?,?,?,?,?)';

    db.run(sql, [name, qids, content, req.session.username, curdate, req.session.username, curdate], function (err) {
        if (err) {
            result = {
                code: 400,
                msg: '添加失败'
            };
            res.json(result);
            throw err;
        } else {
            result = {
                code: 200,
                msg: '添加成功',
                exam_id: this.lastID
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

router.post('/exam_update', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
    var name = req.body.name;
    var qids = req.body.qids;
    var content = req.body.content;
    var exam_id = req.body.exam_id;
    var curdate = moment().format('YYYY-MM-DD HH:mm:ss');

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'update exam set name = ?,qids=?,content=?,updated_by=?,updated_time=? where id=?';

    db.run(sql, [name, qids, content, req.session.username, curdate, exam_id], function (err) {
        if (err) {
            result = {
                code: 400,
                msg: '修改失败'
            };
            res.json(result);
            throw err;
        } else {
            result = {
                code: 200,
                msg: '修改成功',
                exam_id: this.lastID
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

module.exports = router;