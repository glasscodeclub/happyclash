const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isReplied: Boolean,
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    message: String,
    time: String,
    subComments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

module.exports = mongoose.model("Comment", commentSchema)
