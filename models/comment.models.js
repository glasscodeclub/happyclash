const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    username: String,           //username
    isReplied: {
        type: Boolean,
        default: false
    },
    video: String,          //video id
    message: String,
    time: {
        type: Date,
        default: Date.now()
    },
    subComments: [String]  //comment ids
})

module.exports = mongoose.model("Comment", commentSchema)
