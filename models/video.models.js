var mongoose = require("mongoose");

var VideoSchema = new mongoose.Schema({
    username: String,        //username
    views: Number,
    clash: String,           //clash id
    video: String,
    uploadTime: {
        type: Date,
        default: Date.now()
    },
    likes: [String],          //usernames array
    dislikes: [String],       //usernames array
    comments: [String],       //comment ids
    time: {
        type: Date,
        default: Date.now()
    },
    rank: Number
});

module.exports = mongoose.model("Video", VideoSchema);
