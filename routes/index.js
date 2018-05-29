var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.username){
    res.redirect('login.html');
  }
  else{
    res.redirect('index.html');
  }
  
});

module.exports = router;
