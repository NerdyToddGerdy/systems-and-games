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

router.get('/:id', function(req, res){ //games_show route
   var newArr = [];
   var newSysArr = [];
   System.find({}, function(err, foundSystem){
      // console.log(foundSystem);
      Game.findById(req.params.id, function(err, foundGame){
         // console.log(foundGame.systems);
         if (foundGame.systems.length < 2) {
            for (var j = 0; j < foundSystem.length; j++) {
               // console.log('%%%%%%%%%%%%%%%%%%%%');
               // console.log(newArr[i]);
               // console.log(foundSystem[j]._id);
               // console.log('does they equal');
               if (foundSystem[j]._id == foundGame.systems[0]){
                  // console.log('yes');
                  // console.log(foundSystem[j]);
                  // console.log('only one system');
                  newSysArr = [foundSystem[j]];
                  // console.log(newSysArr);
               }
            }
               // console.log(newArr[i] + 'this');
            // }
         } else {
            for (var i = 0; i < foundGame.systems.length; i++) {
               // console.log(foundGame._id);
               if (System.findById(foundGame.systems[i])){
                  newSysArr.push(foundSystem[i]);
                  // console.log(newSysArr[i].id);
               }
            }
         }
         // console.log(newSysArr);
         res.render('games/games_show.ejs', {
            gamesArr: foundGame,
            systemsArr: newSysArr
         });
      });
   });
});

router.get('/edit/:id', function(req, res){
   Game.findById(req.params.id, function(err, foundGame){
      System.find({}, function(err, foundSystems){
         res.render('games/games_edit.ejs', {
            gamesArr: foundGame,
            systemsArr:foundSystems
         });
      });
   });
});

//----------------------------------------------------------------
                        //Post Routes
//----------------------------------------------------------------

router.post('/', function(req, res){
   System.find({}, function(err, foundSystems){
      console.log(typeof req.body.systems);
      console.log(">>>>>>>>>>>>>>>>>>>>>>");
      console.log(foundSystems);
      console.log(req.body.systems);
      console.log(">>>>>>>>>>>>>>>>>>>>>>");
      var myArr = [];

      console.log(myArr);
      Game.create(req.body, function(err, createdGame){
         // console.log('++++++++++++++++++++++++++++');
         // console.log('req.body:');
         // console.log(req.body);
         // console.log('req.body.systems:');
         // console.log(req.body.systems);
         // console.log('req.body.systems.length');
         // console.log(req.body.systems.length);
         // console.log('++++++++++++++++++++++++++++++');
         for (var j = 0; j < foundSystems.length; j++) {
            console.log(typeof req.body.systems, req.body.systems, typeof req.body.systems === 'object');
            if (typeof req.body.systems === 'object') {
               console.log('object');
               for (var i = 0; i < req.body.systems.length; i++) {
                  // console.log('*********************');
                  // console.log(foundSystems[j]._id);
                  // console.log(req.body.systems[i]);
                  // console.log("*********************");
                  if (foundSystems[j]._id == req.body.systems[i]) {
                     console.log('it matched');
                     foundSystems[j].games.push(req.body);
                     // console.log(foundSystem[j].games);
                     foundSystems[j].save(function(err, savedSystem){
                     });
                  }
               }
            } else {
               console.log('not array');
               var elseArr = [];
               console.log(elseArr, 'elseArr before push');
               elseArr.push(req.body.systems);
               console.log(elseArr, 'elseArr after push');
               console.log(foundSystems[j]._id, elseArr[0] ,foundSystems[j]._id == elseArr[0]);
               if (foundSystems[j]._id == elseArr[0]) {
                  console.log('it matched');
                  foundSystems[j].games.push(req.body);
                  console.log(foundSystems[j].games, 'after log');
                  foundSystems[j].save(function(err, savedSystem){
                  });
               }
            }
         }
         res.redirect('/games');
      });
   });
});

//----------------------------------------------------------------
                        //Put Routes
//----------------------------------------------------------------
router.put('/:id', function(req,res){
   Game.findByIdAndUpdate(req.params.id, req.body, function(err, updatedGame){
      console.log(updatedGame,"*******************", req.body);
      System.find({}, function(err, foundSystems){
         for (var i = 0; i < foundSystems.length; i++) {
            // console.log(foundSystems[i].games[0].title,' foundSystems ===');
            // console.log(updatedGame.title);
            for (var j = 0; j < foundSystems[i].games.length; j++) {
               // console.log(foundSystems[i]);
               if (foundSystems[i].games[j].title == updatedGame.title) {
                  // console.log('they match');
                  foundSystems[i].games.splice(j,1,req.body);
                  // console.log(foundSystems[i].games[j]);
                  foundSystems[i].save(function(err, savedFoundSystems){});
                  // foundSystems[i].games.push(updatedGame);
                  // foundSystems[i].save(function(err, savedFoundSystems){});
               }
            }
         }
      });
      res.redirect('/games/');
   });
});


//----------------------------------------------------------------
                        //Delete Routes
//----------------------------------------------------------------

router.delete('/:id', function(req, res){
   console.log("################ DELETE #####################");
   Game.findByIdAndRemove(req.params.id, function(err, foundGame){
      System.find({}, function(err, foundSystems){
         console.log(foundGame.systems[0], 'foundGame****');
         console.log(foundSystems[0].id, 'foundSystems.id$$$$$$');
         console.log(foundGame.systems[0] == foundSystems[0].id);
         for (var i = 0; i < foundGame.systems.length; i++) {
            for (var j = 0; j < foundSystems.length; j++) {
               if (foundGame.systems[i] == foundSystems[j].id) {
                  for (var k = 0; k < foundSystems[j].games.length; k++) {
                     console.log('+++++++++++++++++++++++++++++++++++++++++++',foundSystems[j].games[k]);
                     console.log('-------------------------------------------',foundSystems[j].games[k].title);
                     foundSystems[j].games.splice(j, 1);
                     foundSystems[j].save(function(err, savedSystem){
                     });
                  }
                  // foundSystems[j].games[k].id(req.params.id).remove();
               }
            }
         }
         // console.log('req.params.id',req.params.id,'%%%%foundSystems',foundSystems[0].games);
         // });
         res.redirect('/games');
      });
   });
});
         // for (var i = 0; i < foundSystems.length; i++) {
            // for (var j = 0; j < foundSystems[i].games.length; j++) {
            // console.log('******',foundSystems[i],'******');
            // console.log('foundSystems');
            // console.log('>>>>>>',foundSystems[i].games[j],'<<<<<<');
            // console.log('games');
            // console.log('^^^^^^',foundSystems[i].games[j].title,'^^^^^^');
            // console.log(req.params.id);
            // }
            // foundSystems[i].games.id(req.params.id).remove();
            // foundSystems.save(function(err, savedSystem){
            // });
         // }








module.exports = router;
