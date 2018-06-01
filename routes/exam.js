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

module.exports = router;