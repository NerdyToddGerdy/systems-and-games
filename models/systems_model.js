var mongoose = require('mongoose');
// var System = require('/games.js');

var systemSchema = mongoose.Schema({
   name: {type:String, required:true, unique:true},
   brand: String,
   releaseDate: Date,
   logo: {type:String, required:true},
   img: {type:String, required:true},
   games:[]
});

var system = mongoose.model('System', systemSchema);

module.exports = system;
