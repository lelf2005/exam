var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

    

router.get('/', function (req, res, next) {
  res.render('upload', {title: 'upload'});
});
router.post('/fileUpload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    
    form.uploadDir = path.join(__dirname, '../static/upload');
    
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write(form.uploadDir);
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });

    return;

  
});
module.exports = router;