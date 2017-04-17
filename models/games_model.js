var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
   title: {type:String, required:true, unique:true},
   releaseDate: Date,
   genre: String,
   msrp: String,
   img: String,
   systems: [String]
});

var system = mongoose.model('Game', gameSchema);

module.exports = system;
