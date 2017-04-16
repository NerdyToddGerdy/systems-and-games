var express = require('express');
var System = require('../models/systems_model.js');
var router = express.Router();


//----------------------------------------------------------------
                        //Get Routes
//----------------------------------------------------------------

router.get('/', function(req, res){
   System.find({}, function(err, foundSystems){
      res.render('systems/systems_index.ejs',{
         systemsArr: foundSystems
      });
   });
});

router.get('/new',function(req, res){
   res.render('systems/systems_new.ejs');
});

router.get('/edit/:id', function(req, res){
   System.findById(req.params.id, function(req, foundSystems){
      res.render('systems/systems_edit.ejs', {
         systemsArr: foundSystems
      });
   });
});

router.get('/:id', function(req, res){
   System.findById(req.params.id, function(err, foundSystems){
      res.render('systems/systems_show.ejs', {
         systemsArr: foundSystems
      });
   });
});

//----------------------------------------------------------------
                        //Post Routes
//----------------------------------------------------------------
router.post('/', function(req, res){
   System.create(req.body, function(err, createdSystem){
      res.redirect('/systems');
   });
});

//----------------------------------------------------------------
                        //Put Routes
//----------------------------------------------------------------
router.put('/:id', function(req, res){
   System.findByIdAndUpdate(req.params.id, req.body, function(){
      res.redirect('/systems');
   });
});

//----------------------------------------------------------------
                        //Delete Routes
//----------------------------------------------------------------
router.delete('/:id', function(req, res){
   System.findByIdAndRemove(req.params.id, function(err, foundSystems){
      res.redirect('/systems');
   });
});

module.exports = router;
