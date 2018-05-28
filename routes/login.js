var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
  res.render('login', {title: 'login'});
});
router.post('/userLogin', function (req, res, next) {
  var username = req.body.username;//获取前台请求的参数
  var password = req.body.password;
  result = {
    code: 200,
    msg: '密码正确'
  };
  res.json(result);
  
});
module.exports = router;