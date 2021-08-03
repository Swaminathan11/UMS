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

  
router.post("/res", function(req, res) {
    let a = req.body.stud_res_up;
    let marks = []
    con.query("select student.student_id, subjects.subject_id, subjects.subject_name from student inner join subjects on student.course_id = subjects.course_id and student_id=" + mysql.escape(a) + ";", function (err, result, fields){
      if (err) {
          res.send('/');
      }else
      if(result.length === 0){
        res.send("No Student data found")
      }else {
        res.render('result', {
          subs: result,
          a : a,
          marks : marks
      })
    }
})
})
  
router.post("/results", (req, res)=> {
    let a = req.body.marks
    let b = req.body.student_id_res
    let c = req.body.promarks
    con.query("INSERT INTO result(student_id,m1,m2,m3,m4,pro) values (" + mysql.escape(b) + "," + mysql.escape(a[0]) + "," + mysql.escape(a[1]) + "," + mysql.escape(a[2]) + "," + mysql.escape(a[3]) +  "," + mysql.escape(c) + ");", function (err, result, fields) {
      if (err) throw err;
  
      res.send("Student result succesfully Added");
  })
})


var sql = "select result.student_id, result.m1, result.m2,result.m3, result.m4,result.pro,result.total,result.perc,project.name from result inner join project on result.student_id=project.student_id where result.student_id=?;select subject_name from subjects where course_id = (select course_id from student where student_id=?); ";

router.post("/resu_page", (req, res) => {
  let a = req.body.stud_res_td
  con.query(sql , [a , a],  (err, result, fields) => {
    if (err) {
      res.send('Invalid Details');
  }
      res.render("final", {
        marks : result,
        a : a
      })
  } )
})

router.get("/opp", (req, res) =>{
  res.render("stdres")
})

router.get('/pro', (req, res) => {
    res.render('pro');
  })
  
  //project description
  router.post('/prosub', (req, res) => {
    let a = req.body.stud_id;
    let b = req.body.fac_name;
    let c = req.body.pro_name;
    con.query("INSERT INTO project values (" + mysql.escape(a) + "," + mysql.escape(b) + "," + mysql.escape(c) + ")", function (err, result, fields) {
      if (err) throw err;
  
      res.send("Project added Successfully")
    })
  })
  
  
router.post('/test2', (req, res) => {
    let a = req.body.marks_to_filter;
    let b = Number(a);
    con.query("select result.student_id, test.student_name,test.name,result.pro from result inner join test on test.student_id=result.student_id where result.pro>=" + mysql.escape(a), (err, result, fields) => {
      if (err) throw err;
      else if(result.length === 0){
        res.render('notest');
    }
    else {
      res.render('test3', {
        stud : result,
        a : a
      })
    }
  })
})

module.exports = router