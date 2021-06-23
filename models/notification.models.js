const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    username: String,    //username
    heading: String,
    body: String,
    time: String,
    isRead: {
        type: Boolean,
        default: false
    },
    option: Boolean
})

module.exports = mongoose.model("Notification", notificationSchema)
