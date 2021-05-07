
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var middlewares = require("../middlewares/auth.middleware");


router.get("/", function (req, res) {
    res.render("./careermodule/career", { url: req.url });
})
router.get("/edit", function(req, res){
    res.render("./careermodule/editProfile", {url: req.url});
})

module.exports = router;