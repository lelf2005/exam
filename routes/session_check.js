var express = require('express');
var router = express.Router();

router.post('/session_check', function (req, res, next) {
    if (!req.session.username) {
        result = {
            code: 400,
            msg: '登录超时'
        };
    }else{
        result = {
            code: 200,
            username: req.session.username
        };
    }
    res.json(result);
   
});
module.exports = router;