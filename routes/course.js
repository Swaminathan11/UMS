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

router.post('/course', function(req, res) {
    let h = req.body.course;
    con.query("select * from course where Dept_id = " + mysql.escape(h) , (err, result, fields) => {
            if (err) {
                res.send('/');
            }else if
            (result.length === 0 ){
                res.send("No courses Specified Departments")
            }else {
                res.render('course', {
                courses : result,
                h:h
            });
        }  
    });
});
  
        //adding new courses
router.post('/course_add', function (req, res) {
    let a = req.body.course_id_to_add;
    let b = req.body.course_name_to_add;
    let c = req.body.dept_of_course;
        
    con.query("INSERT INTO course values (" + mysql.escape(a) + "," + mysql.escape(b) + "," + mysql.escape(c) + ")", function (err, result, fields) {
    if (err) throw err;
        else 
    res.send("Course succesfully added");
    });
});
  
          //deleting coruses offered
router.post('/course_del', function (req, res) {
    let e = req.body.course_id_to_del;
    con.query("DELETE FROM COURSE WHERE COURSE_ID = " + mysql.escape(e), function(err, result){
        if (err) throw err;
      
        res.send("Oourse succesfully deleted");
    })
})
      
module.exports = router