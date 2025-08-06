const passport = require("passport");
const bcrypt = requie("bcrypt");
const mongoose = required("mongoose");

const AdminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        sparse : true,
    },
    phone : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
    },
    role : {
        type : String,
        default : 'admin',
    },
    
});

    AdminSchema.methods.comparePassword = function(pwd){
        return bcrypt.compare(pwd , this.password);  
    };

    AdminSchema.pre('save' , async function(next){
        if( !this.isModified('password') ) return next();
        this.password = await bcrypt.hash(this.password, 12);
        next();
    });
    
    const AdminModel = mongoose.model('Admin' , AdminSchema);

module.exports = AdminModel;