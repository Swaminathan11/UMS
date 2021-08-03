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
  
router.post('/depts', function (req, res) {
 
    let a = req.body.dept_name;
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
 
router.post('/depts2', function (req, res) {
 
  let a = req.body.dept_name;
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
            res.render('dept2', {
                  depts : result,
                  a:a
            });
        });
    });


router.get('/studcor', (req, res) => {
  res.render('studcorn')
})
      //adding a new dept
router.post('/dept_add', function (req, res) {
    let a = req.body.clg_id_to_add;
    let b = req.body.dept_id_to_add;
    let c = req.body.dept_name_to_add;
    let d = req.body.dept_con_to_add;
    con.query("INSERT INTO Department values (" + mysql.escape(b) + "," + mysql.escape(c) + "," + mysql.escape(d) + "," + mysql.escape(a) +")", function (err, result, fields) {
    if (err) throw err;
    
    res.send("Department succesfully added");
  });
});
  
//deleting an existing department
router.post('/dept_del', function (req, res) {
    let e = req.body.dept_id_to_del;
    con.query("DELETE FROM DEPARTMENT WHERE DEPT_ID = " + mysql.escape(e), function(err, result){
    if (err) throw err;
    
    res.send("Dppartment succesfully deleted");
  })
})

router.post('/fac_o_course', (req, res) => {
    let a = req.body.dept_to_fac_o_course;
    res.render('foc', {
    a,a
  })
})
               
module.exports = router   