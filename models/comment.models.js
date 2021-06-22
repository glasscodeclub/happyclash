const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    user:{
        type:String,
    },
    isReplied: Boolean,
    video:{
        type:String,
    },
    message: String,
    time: String,
    subComments: [
        {
            type:String,
        }
    ]
})

module.exports = mongoose.model("Comment", commentSchema)
