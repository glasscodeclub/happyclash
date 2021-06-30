const mongoose = require("mongoose")

const userDetailSchema = new mongoose.Schema({
    city: {
        type: String,
        default: null
    },
    profilePic: {
        type: String,
        default: "https://picsum.photos/200"
    },
    name: {
        type: String,
        default: null

    },
    email:{
     type:String,
     unique:true,
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    username: {type:String,unique:true} ,   //username
    age: {
        type: Number,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    followers: [String],  //usernames array
    following: [String],  //usernames array
    wonClashes: [String],     //clash ids
    highestRank: {
        type: Number,
        default: null
    },
    longestStreak: {
        type: Number,
        default: null

    }
})

module.exports = mongoose.model("Userdetails", userDetailSchema)
