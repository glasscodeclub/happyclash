var mongoose = require("mongoose");

var VideoSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    views: Number,
    clash: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clash"
    },
    video: String,
    uploadTime: {
        type: Date,
        default: Date.now()
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    time: {
        type: Date,
        default: Date.now()
    },
    rank: Number
});

module.exports = mongoose.model("Video", VideoSchema);
