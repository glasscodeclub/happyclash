const url = require("url")
const User = require("../models/user.models")
const Video = require("../models/video.models")
const Clash = require("../models/clash.models")
const Userdetail = require("../models/userdetails.models")

module.exports.career = async (req, res) => {
    try {
        const { username } = req.user
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })
        const videos = await Video.find({ username: { $eq: username } })
        const clashes = await Clash.find({ username: { $eq: username } })
        const days = Math.floor((new Date() - new Date(userDetails.joinDate)) / (1000 * 60 * 60 * 24))
        res.render("./careermodule/career", { url: req.url, userDetails, days, videos, clashes });
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.editForm = async (req, res) => {
    try {
        const { username, phone } = req.user;
        const user = await Userdetail.findOne({ username: { $eq: username } })
        res.render("./careermodule/editProfile", { url: req.url, user, phone });
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.updateDetails = async (req, res) => {
    try {
        const { name, city, phone } = req.body
        const { username } = req.user;
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })
        const user = await User.findOne({ username: { $eq: username } })
        user.phone = phone
        userDetails.name = name
        userDetails.city = city
        await user.save()
        await userDetails.save()
        res.redirect("/career/edit")
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.profile = async (req, res) => {
    try {
        const { username } = req.user
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })

        let docs = await Video.find({ username: { $eq: username } })
        docs = docs.reverse().slice(0, 5)

        res.render("./careermodule/profile", { url: req.url, videosArray: docs, userDetails });
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.postPage = async (req, res) => {
    try {
        let { page, size, username } = req.query
        let docs

        if (!page) page = 1
        if (!size) size = 10

        const limit = parseInt(size)
        const skip = (parseInt(page) - 1) * parseInt(size)

        if (username) {
            docs = await Video.find({ username: { $eq: username } })
        } else {
            const { username } = req.user
            docs = await Video.find({ username: { $eq: username } })
        }
        docs = docs.reverse().slice(skip, limit + skip)

        res.render("./careermodule/post", { page: "Post", url: req.url, videosArray: docs })
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.loadMore = async (req, res) => {
    try {
        let { page, size } = req.body
        if (!page) page = 1
        if (!size) size = 10

        const limit = parseInt(size)
        const skip = (parseInt(page) - 1) * parseInt(size)

        const { username } = req.user
        let docs = await Video.find({ username: { $eq: username } })
        docs = docs.reverse().slice(skip, limit + skip)

        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}
