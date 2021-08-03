const router = require("./college");
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');
var path = require('path');
const router = express.Router()

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kaspersky@123",
    database: "testpro",
    multipleStatements: true
  });

  /* Faculty */
router.post('/fac', function(req, res) {
    let h = req.body.faculty;
con.query("select * from faculty where Dept_id = " + mysql.escape(h) , (err, result, fields) => {
            if (err) {
                res.send('/');
            }
            if(result.length === 0 ){
                res.send("No Faculty under Specified Departments")
            }else {
                res.render('faculty', {
                depts : result,
                h:h
            });
        }  
    });
});
  
        //adding a faculty details
router.post('/fac_add', function (req, res) {
    let a = req.body.fac_id_to_add;
    let b = req.body.fac_name_to_add;
    let c = req.body.fac_edu_to_add;
    let d = req.body.fac_pos_to_add;
    let e = req.body.dept_of_fac;
    con.query("INSERT INTO FACULTY values (" + mysql.escape(a) + "," + mysql.escape(b) + "," + mysql.escape(c) + "," + mysql.escape(d) + "," + mysql.escape(e) + ")", function (err, result, fields) {
    if (err) throw err;
        else 
    res.send("Faculty succesfully added");
    });
});
  
          //deleting an existing faculty detail
router.post('/fac_del', function (req, res) {
    let e = req.body.fac_id_to_del;
    con.query("DELETE FROM FACULTY WHERE FACULTY_ID = " + mysql.escape(e), function(err, result){
    if (err) throw err;  
        res.send("Faculty succesfully deleted");
    })
})
      
module.exports = router