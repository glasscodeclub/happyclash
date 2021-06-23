const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
    username: String,   //username
    email: String,
    message: String,
    for: [String],
    time: {
        type: Date,
        default: Date.now()
    },
    status: Boolean
})

module.exports = mongoose.model("Report", reportSchema)
