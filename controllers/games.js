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

router.get('/:id', function(req, res){
   Game.findById(req.params.id, function(err, foundGames){
      res.render('games/games_show.ejs', {
         gamesArr: foundGames
      });
   });
});

//----------------------------------------------------------------
                        //Post Routes
//----------------------------------------------------------------
router.post('/', function(req, res){
   System.find({}, function(err, foundSystem){
      // console.log(foundSystem);
      console.log(req.body);
      Game.create(req.body, function(err, createdGame){
         // console.log();
         // res.send(req.body);
         for (var i = 0; i < req.body.systemId.length; i++) {
            foundSystem.games.push(createdGame);
            foundSystem.save(function(err, savedSystem){
               res.redirect('/games');
            });
         }
      });
   });
});


module.exports = router;
