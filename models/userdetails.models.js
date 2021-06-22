const mongoose = require("mongoose")

const userDetailSchema = new mongoose.Schema({
    city: {
        type:String,
    },
    profilePic: {
        type:String,
    },
    name: {
        type:String,
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type:String,
    },
    age: Number,
    bio: String,
    clashes: [
        {
            type:String,
        }
    ],
    followers: [
        {
            type:String,
        }
    ],
    following: [
        {
            type:String,
        }
    ],
    videosCreated: [
        {
            type:String,
        }
    ],
    wonClashes: [
        {
            type:String,
        }
    ],
    highestRank: Number,
    notifications: [
        {
            type:String,
        }
    ],
    longestStreak: Number
})

module.exports = mongoose.model("Userdetails", userDetailSchema)
