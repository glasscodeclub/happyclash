const mongoose = require("mongoose")

const userDetailSchema = new mongoose.Schema({
    city: {
        type: String,
        default: null
    },
    profilePic: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    username: String,    //username
    age: {
        type: Number,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    clashes: [String],  //clash ids
    followers: [String],  //usernames array
    following: [String],  //usernames array
    videosCreated: [String],  //video ids
    wonClashes: [String],     //clash ids
    highestRank: {
        type: Number,
        default: null
    },
    notifications: [String],  //notification ids
    longestStreak: {
        type: Number,
        default: null
    }
})

module.exports = mongoose.model("Userdetails", userDetailSchema)
