const mongoose = require("mongoose")

const userDetailSchema = new mongoose.Schema({
    city: String,
    profilePic: String,
    name: String,
    joinDate: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongose.Schema.Types.ObjectID,
        ref: "User"
    },
    age: Number,
    bio: String,
    clashes: [
        {
            type: mongose.Schema.Types.ObjectID,
            ref: "Clash"
        }
    ],
    followers: [
        {
            type: mongose.Schema.Types.ObjectID,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongose.Schema.Types.ObjectID,
            ref: "User"
        }
    ],
    videosCreated: [
        {
            type: mongose.Schema.Types.ObjectID,
            ref: "Video"
        }
    ],
    wonClashes: [
        {
            type: mongose.Schema.Types.ObjectID,
            ref: "Clash"
        }
    ],
    highestRank: Number,
    notifications: [
        {
            type: mongose.Schema.Types.ObjectID,
            ref: "Notification"
        }
    ],
    longestStreak: Number
})

module.exports = mongoose.model("Userdetails", userDetailSchema)
