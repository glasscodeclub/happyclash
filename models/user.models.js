var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    password:String,
    password_name:String,
    email:{
        type:String,
        unique:true,
    },
    phone:{
        type:String,
    },
    randomString:{
        type:String,
    },
    isVerfied:{
        type:Boolean,
        default:false,
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);

