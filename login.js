var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');
var path = require('path');

const app = express()
app.use(bodyparser.urlencoded({ extended: true}))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//stylesheet linking
app.use('/css', express.static(__dirname + '/public/assets/css/styles.css'))
//serving up the html home page
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/start.html'));
});
app.get('/start.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/start.html'));
})

//login route
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/login.html'));
})

//ejs templating
app.set('view engine', 'ejs'); 
app.use(bodyparser.json());

//connecting to local MySql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kaspersky@123",
  database: "testpro",
  multipleStatements: true
});

//login route
app.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
// check if user exists
        
          //mysql Squery
          con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.render('clgorstu');
            } else {
                response.send('Incorrect Username and/or Password!');
            }           
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.use(require('./routes/college'));
app.use(require('./routes/dept'));
app.use(require('./routes/course'));
app.use(require('./routes/faculty'));
app.use(require('./routes/results'));
app.use(require('./routes/sub'));

app.listen(3000)