var express = require('express');
var Game = require('../models/games_model.js');
var router = express.Router();
var System = require('../models/systems_model.js')

//----------------------------------------------------------------
                        //Get Routes
//----------------------------------------------------------------

router.get('/', function(req, res){
   Game.find({}, function(err, foundGames){
      res.render('games/games_index.ejs', {
         gamesArr: foundGames
      });
   });
});

router.get('/new', function(req, res){
   System.find({}, function(err, foundSystems){
      res.render('games/games_new.ejs', {
         systemsArr: foundSystems
      });
   });
});

module.exports = router;
