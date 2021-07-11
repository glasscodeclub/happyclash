
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var { isLoggedIn } = require("../middlewares/auth.middleware");
const Userdetail = require("../models/userdetails.models")
const Video = require("../models/video.models")
const url = require("url")
const { career, editForm, updateDetails, profile, postPage, loadMore, adminControls, searchFrnds, addParticipants } = require("../controllers/career.controller")

router.route("/")
    .get(isLoggedIn, career)

router.route("/edit")
    .get(isLoggedIn, editForm)
    .post(isLoggedIn, updateDetails)

router.route("/profile")
    .get(isLoggedIn, profile)

router.get('/notification', (req, res) => {
    res.render("./careermodule/notification", { url: req.url });
})

router.route("/admincontrols")
    .get(isLoggedIn, adminControls)
    .post(isLoggedIn, searchFrnds)

router.route('/addParticipants/:id')
    .post(isLoggedIn, addParticipants)

router.get("/results", (req, res) => {
    res.render("./careermodule/results", { url: req.url })
})

router.get("/congratulations", (req, res) => {
    res.render("./careermodule/congratulations", { url: req.url })
})

router.route("/post")
    .get(isLoggedIn, postPage)

router.route("/load-more")
    .post(isLoggedIn, loadMore)

module.exports = router;
