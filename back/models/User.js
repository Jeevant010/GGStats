const mongoose = require('mongoose');


//================= USER SCHEMA ===================
/**
 * I am going to fix this for futher purposes then i will enhance according to my ML algo's
 * The ML algo is the very next targets after fetching the all best creation of rest api's
 * I do able to add a model after that after api of the sports websites
 * 
 */

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: true,
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type: String,
        
    },
    password : {
        type: String,
        required :true,
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;