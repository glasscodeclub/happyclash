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
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    suggestions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isSeenByAllForFriends: Boolean,
    videos: [
        {
            type: mongose.Schema.Types.ObjectID,
            ref: "Video"
        }
    ],
    rank: Number
})

module.exports = mongoose.model("Clash", clashSchema)
