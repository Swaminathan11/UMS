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
  
/*College Deets*/
router.post('/clgs', (req, res) => {
    res.render('clg')
  })
  router.post('/clg_second', function (req, res) {
  
      con.query("SELECT * FROM COLLEGE", (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('clgs', {
              clgs: result
        });
    });
  });
  
  //render College details
router.post('/clg_info', function (req, res) {
      let a =  req.body.Clg_id;
        con.query("sELECT * FROM COLLEGE where Clg_id = " + mysql.escape(a), function (err, result, fields) {
          if (err) throw err;
          if(result.length === 0){
            res.send("No such college")
          }else 
            res.render('namofclg',{
              clgs : result
            });
        });
      });
  
      //adding a new college
router.post('/clg_add', function (req, res) {
  
        let c = req.body.Clg_name_to_add;
        let d = req.body.Clg_add_to_add;
  
        con.query("select Clg_name from college where Clg_name=" + mysql.escape(c), (reqq, ress) => {
          if(ress.length !== 0) {
            res.send("College ID already exixts")
          }else
          con.query("INSERT INTO COLLEGE (Clg_name, Clg_address) values ("  + mysql.escape(c) + "," + mysql.escape(d) + ")", function (err, result, fields) {
  
            
              res.send("College succesfully added");
          });
        });
      })
  
      //deleting a college
router.post('/clg_del', function (req, res) {
          let e = req.body.Clg_id;
          con.query("select Clg_id from college where Clg_id=" + mysql.escape(e), (reqq, ress) => {
            if(ress.length === 0) {
              res.send("College ID doesnt exixts")
            }else
          con.query("DELETE FROM COLLEGE WHERE CLG_ID = " + mysql.escape(e), function(err, result){
            if (result.length === 0){
              res.send("no such Clg_id");
            }
    else
            res.send("College succesfully deleted");
          })
        })
    
      })

      //rendering college details
router.get('/col', function(req, res) {
  con.query("SELECT * FROM COLLEGE", (err, result) => {
    if (err) {
        res.redirect('/');
    }
    res.render('clgs2', {
          clgs: result
    });
});
})
module.exports = router