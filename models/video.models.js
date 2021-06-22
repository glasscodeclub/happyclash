var mongoose = require("mongoose");

var VideoSchema = new mongoose.Schema({
    username: {
        type: String
    },
    views: {
        type: Number,
        default:0,
    },
    clash: {
        type: String,
        default:"",
    },
    videoURL:     {
        type:String,
        default:"",
    },
    videoName:{type:String,   default:"",},
    uploadTime: {
        type: Date,
        default: Date.now()
    },
    likes: [
        {
            type:String,
        }
    ],
    dislikes: [
        {
            type:String,
        }
    ],
    comments: [
        {
            type:String,
        }
    ],
    timeFinish: {
        type: Date,
        default:null,
    },
    rank: {
        type:Number,
        default:null,
    }
});

module.exports = mongoose.model("Video", VideoSchema);
