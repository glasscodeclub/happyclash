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
        default: Date.now()
    },
    category: [String],
    keywords: [String],
    admin:{
        type:String,
    },
    participants: [
        {
            type:String,
        }
    ],
    suggestions: [
        {
            type:String,
        }
    ],
    isSeenByAllForFriends: Boolean,
    videos: [
        {
            type:String,
        }
    ],
    rank: Number
})

module.exports = mongoose.model("Clash", clashSchema)
