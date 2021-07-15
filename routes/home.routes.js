var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
const { isLoggedIn} = require("../middlewares/auth.middleware");

const homeController = require('./../controllers/home.controller');
const { home, loadMore, getRandomVideos } = require("../controllers/home.controller")

router.get("/videomode", function (req, res) {
    res.render("Homemodule/videomode",{page:"Video Mode"});
})
router.route('/homefeed')
    .get(isLoggedIn, home)

router.route("/load-more")
    .post(isLoggedIn, loadMore)

router.route("/get-random-videos")
    .post(isLoggedIn, getRandomVideos)

router.route('/challenge/:clashId').get(isLoggedIn, homeController.getChallengePage);

router.get("/songs", (req, res) => {
    res.render("Homemodule/songs", {url: req.url})
})

router.get("/videomodeprivate", (req, res) => {
    res.render("Homemodule/videomodeprivate", {page:"VideoModePrivate",url: req.url})
})

router.get("/selectedPlaylist", (req, res) => {
    res.render("Homemodule/selectedPlaylist", {page:"Selected Playlist",url: req.url})
})
module.exports = router;