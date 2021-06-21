const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    },
    heading: String,
    body: String,
    time: String,
    isRead: Boolean,
    option: Boolean
})

module.exports = mongoose.model("Notification", notificationSchema)
