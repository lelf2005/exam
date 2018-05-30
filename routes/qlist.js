var express = require('express');
var router = express.Router();
var config = require('../config/config');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var filebuffer = fs.readFileSync(config.db_path);
var moment = require('moment');


/* GET home page. */

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

        res.json({"data":rows});
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });

});

router.post('/qadd*', function (req, res, next) {

    var qtype = req.body.qtype;
    var qrank = req.body.qrank;
    var question = req.body.question;
    var answer = req.body.answer;
    var solution = req.body.solution;
    var curdate = moment().format('YYYY-MM-DD HH:mm:ss');
    
    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'INSERT INTO questions (item, answer,solution,rank,type,created_by,created_time,updated_by,updated_time) VALUES(?,?,?,?,?,?,?,?,?)';

    db.run(sql, [question,answer,solution,qrank,qtype,req.session.username,curdate,req.session.username,curdate], function (err)  {
        if (err) {
          result = {
            code: 400,
            msg: '添加失败'
          };
          res.json(result);
            throw err;
        }else{
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
module.exports = router;