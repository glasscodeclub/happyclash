var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    password:String,
    password_name:String,
    email:String,
    phone:String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);

