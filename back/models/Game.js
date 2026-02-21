const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },

});

const Game = mongoose.model('game' , gameSchema );
module.exports = Game;