var express = require('express');
var app = express();
var mongoose = require('mongoose');
var serve = require('express-static');
var systemsController = require('./controllers/systems.js');
var gamesController = require('./controllers/games.js');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.mongoDBURI || 'mongodb://localhost:27107/gaming';

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/systems', systemsController);
app.use('/games', gamesController);
app.use(express.static('public'));

app.get('/', function(req, res){
   res.render('index.ejs');
});

mongoose.connect(mongoDBURI);

mongoose.connection.once('open', function(){
   console.log('Mongo! Santa Maria!!');
});

app.listen(port, function(){
   console.log('Listening on port:' + port);
});
