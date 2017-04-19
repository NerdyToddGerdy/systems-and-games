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
      // console.log(foundSystem);
      Game.findById(req.params.id, function(err, foundGames){
         for (var i = 0; i < foundGames.systems.length; i++) {
            // console.log(foundGames._id);
            if (System.findById(foundGames.systems[i])){
               newArr.push(foundGames.systems[i]);
               // console.log(newArr);
            }
            if (foundGames.systems.length < 2) {
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
            } else {
               newSysArr.push(foundSystem[0]);
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
   System.find({}, function(err, foundSystems){
      console.log(typeof req.body.systems);
      console.log(">>>>>>>>>>>>>>>>>>>>>>");
      console.log(foundSystems);
      console.log(req.body.systems);
      console.log(">>>>>>>>>>>>>>>>>>>>>>");
      var myArr = [];
      // if (typeof req.body.systems == 'array') {
      //    for (var i = 0; i < req.body.systems.length; i++) {
      //       myArr.push(req.body.systems[i]);
      //       console.log('Array');
      //    }
      // } else if(typeof req.body.systems == 'string'){
      //    myArr.push(req.body.systems);
      //    console.log('String');
      // } else {
      //    console.log("NOPE");
      // }
      console.log(myArr);
      Game.create(req.body, function(err, createdGame){
         console.log('++++++++++++++++++++++++++++');
         console.log('req.body:');
         console.log(req.body);
         console.log('req.body.systems:');
         console.log(req.body.systems);
         console.log('req.body.systems.length');
         console.log(req.body.systems.split(" "));
         console.log('++++++++++++++++++++++++++++++');
         for (var j = 0; j < foundSystems.length; j++) {
            console.log(typeof req.body.systems, req.body.systems, typeof req.body.systems === 'object');
            if (typeof req.body.systems === 'object') {
               console.log('object');
               for (var i = 0; i < req.body.systems.length; i++) {
                  console.log('*********************');
                  console.log(foundSystems[j]._id);
                  console.log(req.body.systems[i]);
                  console.log("*********************");
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
               elseArr.push(req.body.systems[0]);
               if (foundSystems[j]._id == elseArr) {
                  console.log('it matched');
                  foundSystems[j].games.push(req.body);
                  // console.log(foundSystem[j].games);
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
                        //Delete Routes
//----------------------------------------------------------------
router.delete('/:id', function(req, res){
   System.find({}, function(err, foundSystem){
      Game.findByIdAndRemove(req.params.id, function(err, foundGame){
         for (var i = 0; i < foundSystem.length; i++) {
         foundSystem[i].games.id(req.params.id).remove();
      }
      });
      foundSystem.save(function(err, savedSystem){
         res.redirect('/games');
      });
   });
});









module.exports = router;
