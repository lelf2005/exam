var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

    

router.get('/', function (req, res, next) {
  res.render('upload', {title: 'upload'});
});
router.post('/fileUpload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    var filename = '';
    form.keepExtensions = true;
    form.encoding = 'utf-8'
    form.uploadDir = path.join(__dirname, '../static/upload');

    
    
    
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'application/json'});
      var ret = '{"success" : 1, "message" : "success","url": "upload/'+filename+'"}';
      JSON.parse(ret);
      res.end(ret);
    });

    form.on('file', function(name, file) {
      //fs.rename(file.path, path.join(__dirname, '../static/upload') + '/' + file.name);
      filename =path.basename(file.path);
    });

    return;

  
});
module.exports = router;