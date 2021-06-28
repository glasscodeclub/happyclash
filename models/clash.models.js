const mongoose = require("mongoose")

const clashSchema = new mongoose.Schema({
    mode: {
        type: String,
        enum: ["Public", "Friend"]
    },
    title: String,
    description: String,
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        default: Date.now() // add 24 hrs
    },
    category: String,
    keywords: [String],
    username: String,            //username
    participants: [String],   //usernames array
    suggestions: [String],    //usernames array
    isSeenByAllForFriends: Boolean,
    selectedAllFollowers: Boolean,
    view:[String],
    videos: [String],        //video ids
    rank: Number
})

module.exports = mongoose.model("Clash", clashSchema)
