const mongoose = require("mongoose")

const userDetailSchema = new mongoose.Schema({
    city: {
        type:String,
        default:null,
    },
    profilePicLink: {
        type:String,
        default:null,
    },
    name: {
        type:String,
        default:null,
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type:String,
    },//user.models.js
    age: {
        type:Number,
        default:null,
    },
    bio: {
        type:String,
        default:null,
    },
    clashes: [
        {
            type:String,
        }
    ],//clash.models.js
    followers: [
        {
            type:String,
        }
    ],//user.models.js
    following: [
        {
            type:String,
        }
    ],//user.models.js
    videosCreated: [
        {
            type:String,
        }
    ],//video.models.js in library
    wonClashes: [
        {
            type:String,
        }
    ],//clash.models.js
    highestRank: {
        type:Number,
        default:null,
    },
    notifications: [
        {
            type:String,
        }
    ],//notification.models.js
    longestStreak:{
        type:Number,
        default:null,
    }
})

module.exports = mongoose.model("Userdetails", userDetailSchema)
