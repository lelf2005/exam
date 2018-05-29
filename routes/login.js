var express = require('express');
var router = express.Router();
var config = require('../config/config');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var filebuffer = fs.readFileSync(config.db_path);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {title: 'login'});
});
router.post('/userLogin', function (req, res, next) {
  var uname = req.body.username;//获取前台请求的参数
  var password = req.body.password;

  var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  var sql = 'SELECT * FROM users WHERE username="' + uname + '"';
  db.get(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    if (!row) {
        result = {
            code: 300,
            msg: '该账号不存在'
          };
      res.json(result);
    } else {
        var sql = "select password from users where username=?";
        db.get(sql,[uname], (err, row) => {
        if (err) {
          console.log(err.message);
          result = {
            code: 400,
            msg: '查询失败'
          };
          res.json(result);
        } else {
            var temp = row.password;  
            console.log(temp);
            if (temp == password) {
              result = {
                code: 200,
                msg: '密码正确'
              };
            } else {
              result = {
                code: 400,
                msg: '密码错误'
              };
            }
          res.json(result);
        }

      });

    }

  });
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});
module.exports = router;