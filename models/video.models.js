var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var VideoSchema = new mongoose.Schema({
    videoid:{
        type:String,
        unique:true,
    },
    videourl:{
        type:String,
        unique:true,
    },
    
});

VideoSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Video",VideoSchema);

