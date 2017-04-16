var express = require('express');
var app = express();
var mongoose = require('mongoose');
var serve = require('express-static');
var systemsController = require('./controllers/systems.js');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/systems', systemsController);
app.use(express.static('public'));

app.get('/', function(req, res){
   res.render('index.ejs');
});

mongoose.connect('mongodb://localhost:27017/gaming');

mongoose.connection.once('open', function(){
   console.log('Mongo! Santa Maria!!');
});

app.listen(3000, function(){
   console.log('Let the games begin!');
});
