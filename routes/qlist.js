var express = require('express');
var router = express.Router();
var config = require('../config/config');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var filebuffer = fs.readFileSync(config.db_path);

/* GET home page. */

router.post('/qlist*', function (req, res, next) {

    var db = new sqlite3.Database(config.db_path, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    var sql = 'SELECT id,item,type,rank FROM questions';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        var jsonArr = [];
        //rows.forEach((row) => {
        //console.log(rows.jsonArr());
        //var ret = {"data":rows};
        // jsonArr[i] = row;

        // });

        res.json({"data":rows});
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });

});
module.exports = router;