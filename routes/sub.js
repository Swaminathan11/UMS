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

/*Subjects */
router.post("/sub_view", (req, res) => {
    let a = req.body.course_id_to_view
    con.query("select * from subjects where course_id=" + mysql.escape(a), function (err, result, fields) {
      if (err) throw err;
  
      res.render('subject', {
        subjects : result,
        a : a
      })
    })
  })
  
  //adding new subjects
router.post("/subjects_to_add", (req, res) => {
    let a = req.body.cour_id
    let b = req.body.sub_id
    let c = req.body.sub_name
    let e = req.body.fac_al_id
  
    con.query("INSERT INTO subjects values (" + mysql.escape(c) + "," + mysql.escape(b) + "," + mysql.escape(a) + "," + mysql.escape(e) + ")", function (err, result, fields) {
    if (err) throw err;
    res.send("Subject added Successfully")
})
})
  
router.post('/sub_del', function (req, res) {
    let e = req.body.sub_id_to_del;
    con.query("DELETE FROM SUBJECTS WHERE SUBJECT_ID = " + mysql.escape(e), function(err, result){
      if (err) throw err;
  
      res.send("Subject succesfully deleted");
    })
})
  
router.get("/views/stdres.ejs", (req, res) => {
    res.render("stdres")
})
router.post("/fclgtodept", (req, res) => {
    let a  = req.body.clg_id;
    con.query("SELECT * FROM department WHERE Clg_id = " + mysql.escape(a), (err, result) => {
      if (err) {
          res.send('/');
      } else
      if(result.length === 0){
        res.render('ifnodept', {
          depts : result,
          a : a
        });
      }else
      res.render('dept', {
            depts : result,
            a:a
      });
  });
});
  
module.exports = router