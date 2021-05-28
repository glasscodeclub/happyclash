var mongoose = require("mongoose");


var VideoSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    videoName:{
        type:String
    }
});


module.exports = mongoose.model("Video",VideoSchema);

