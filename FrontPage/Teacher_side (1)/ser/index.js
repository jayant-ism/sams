var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// set ejs as rendering engine
app.set('view engine', 'ejs');

// parse html forms
app.use(bodyParser.urlencoded({ extended : false }));

// render the ejs page
app.get('/', function (req, res) {
  res.render('index.ejs');
});

// when Add to Top button is clicked
app.post('/top', function (req, res) {
  console.log(req.body.todo + " is added to top of the list.");
  res.redirect('/');
});

// when Add to Bottom button is clicked
app.post('/bottom', function (req, res) {
  console.log(req.body.todo + " is added to bottom of the list.");
  res.redirect('/');
});

app.listen(8000);
console.log('App is listening on PORT 8000');