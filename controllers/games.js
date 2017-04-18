var express = require('express');
var Game = require('../models/games_model.js');
var router = express.Router();
var System = require('../models/systems_model.js');

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
   var newArr = [];
   var newSysArr = [];
   System.find({}, function(err, foundSystem){
      Game.findById(req.params.id, function(err, foundGames){
         for (var i = 0; i < foundGames.systems.length; i++) {
            // console.log(foundGames._id);
            if (System.findById(foundGames.systems[i])){
               newArr.push(foundGames.systems[i]);
               // console.log(newArr);
            }
            for (var j = 0; j < foundSystem.length; j++) {
               // console.log('%%%%%%%%%%%%%%%%%%%%');
               // console.log(newArr[i]);
               // console.log(foundSystem[j]._id);
               // console.log('does they equal');
               if (newArr[i] == foundSystem[j]._id){
                  // console.log('yes');
                  // console.log(foundSystem[j]);
                  newSysArr.push(foundSystem[j]);
               }
               // console.log(newArr[i] + 'this');
            }
         }
         // console.log(newSysArr);
         res.render('games/games_show.ejs', {
            gamesArr: foundGames,
            systemsArr: newSysArr
         });
      });
   });
});

//----------------------------------------------------------------
                        //Post Routes
//----------------------------------------------------------------
router.post('/', function(req, res){
   System.find({}, function(err, foundSystem){
      console.log(">>>>>>>>>>>>>>>>>>>>>>");
      console.log(foundSystem);
      console.log(req.body.systems);
      console.log(">>>>>>>>>>>>>>>>>>>>>>");
      Game.create(req.body, function(err, createdGame){
         console.log(req.body);
         for (var j = 0; j < foundSystem.length; j++) {
            for (var i = 0; i < req.body.systems.length; i++) {
               console.log('*********************');
               console.log(foundSystem[j]._id);
               console.log(req.body.systems[i]);
               console.log("*********************");
               if (foundSystem[j]._id == req.body.systems[i]) {
                  console.log('it matched');
                  foundSystem[j].games.push(req.body);
                  // console.log(foundSystem[j].games);
                  foundSystem[j].save(function(err, savedSystem){
                  });
               }
            }
         }
         res.redirect('/games');
      });
   });
});
//----------------------------------------------------------------
                        //Delete Routes
//----------------------------------------------------------------
router.delete('/:id', function(req, res){
   Game.findByIdAndRemove(req.params.id, function(err, foundGame){
      res.redirect('/games');
   });
});
module.exports = router;
