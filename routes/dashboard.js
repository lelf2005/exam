var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();

router.post('/count*', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
   

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    var sql = 'select * from (select count(*) as q from questions where isdel=0),(select count(*) as e from exam where isdel=0),(select count(*) as u from users),(select count(distinct tag) as t from tags)';

    db.get(sql, [], (err, row) => {
        if (err) {
            throw err;
        } else {
            result = {
                code: 200,
                msg: '查询成功',
                q_count: row.q,
                e_count: row.e,
                u_count: row.u,
                t_count: row.t
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

router.post('/qtypecount*', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
        res.json(result);
        return;
    }
   

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    var sql = 'select type, count(type) as c from questions where isdel=0 group by type';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            result = {
                code: 200,
                msg: '查询成功',
            };
            result["data"] = rows;
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