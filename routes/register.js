var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('register', {title: 'register'});
});
router.post('/userRegister', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name; //获取前台请求的参数
  result = {
    code: 200,
    msg: '注册成功'
  };
  res.json(result); 
 
});
module.exports = router;