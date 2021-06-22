const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
    user: {
        type:String,
    },
    email: {
        type:String,
    },
    message: {
        type:String,
    },
    for: [{
        type:String,
    }],
    time: {
        type: Date,
        default: Date.now()
    },
    status: {
        type:Boolean,
    }
})

module.exports = mongoose.model("Report", reportSchema)
