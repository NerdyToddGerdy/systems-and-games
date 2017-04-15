var express = require('express');
var app = express();
var serve = require('express-static');

app.use(express.static('public'));

app.get('/', function(req, res){
   res.render('index.ejs');
});



app.listen(3000, function(){
   console.log('Let the games begin!');
});
