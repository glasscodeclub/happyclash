const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    username: String,           //username
    isReplied: {
        type: Boolean,
        default: false
    },
    video: String,          //video id
    message: String,
    time: String,
    subComments: [String]  //comment ids
    subComments: [
        {
            type:String,
        }
    ]
})

module.exports = mongoose.model("Comment", commentSchema)
