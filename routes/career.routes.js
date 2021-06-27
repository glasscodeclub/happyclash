
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var { isLoggedIn } = require("../middlewares/auth.middleware");
const Userdetail = require("../models/userdetails.models")
const Video = require("../models/video.models")
const url = require("url")

router.get("/", function (req, res) {
    res.render("./careermodule/career", { url: req.url });
})

router.get("/edit", function (req, res) {
    res.render("./careermodule/editProfile", { url: req.url });
})

router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const { username } = req.user
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })

        let docs = await Video.find({ _id: { $in: userDetails.videosCreated } })
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
})

router.get('/notification', (req, res) => {
    res.render("./careermodule/notification", { url: req.url });
})

router.get("/admincontrols", (req, res) => {
    res.render("./careermodule/admincontrols", { url: req.url })
})

router.get("/results", (req, res) => {
    res.render("./careermodule/results", { url: req.url })
})

router.get("/congratulations", (req, res) => {
    res.render("./careermodule/congratulations", { url: req.url })
})

router.get("/post", isLoggedIn, async (req, res) => {
    try {
        let { page, size, username } = req.query
        let userDetails

        if (!page) page = 1
        if (!size) size = 10
        
        const limit = parseInt(size)
        const skip = (parseInt(page) - 1) * parseInt(size)

        if (username) {
            userDetails = await Userdetail.findOne({ username: { $eq: username } })
        } else {
            const { username } = req.user
            userDetails = await Userdetail.findOne({ username: { $eq: username } })
        }

        let docs = await Video.find({ _id: { $in: userDetails.videosCreated } })
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
})

router.post("/load-more", isLoggedIn, async (req, res) => {
    try {
        let { page, size } = req.body
        if (!page) page = 1
        if (!size) size = 10

        const limit = parseInt(size)
        const skip = (parseInt(page) - 1) * parseInt(size)

        const { username } = req.user
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })

        let docs = await Video.find({ _id: { $in: userDetails.videosCreated } })
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
})

module.exports = router;
