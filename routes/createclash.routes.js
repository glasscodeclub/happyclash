
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var middlewares = require("../middlewares/auth.middleware");


router.get('/createNewClash', (req, res) => {
    res.render("createclashmodule/newClash", { url: req.url });
})

router.get("/clashcreated", (req, res) => {
    res.render("createclashmodule/clashCreated", { url: req.url });
})

router.get('/addParticipants', (req, res) => {
    res.render("createclashmodule/addParticipants", { url: req.url });
})

router.get("/whocanwatch", (req, res) => {
    res.render("createclashmodule/whoCanWatch", { url: req.url })
})

module.exports = router;