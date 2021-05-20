var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var middlewares = require("../middlewares/auth.middleware");


router.get("/videomode", function (req, res) {
    res.render("homemodule/videomode",{page:"Video Mode"});
})
router.get('/homefeed',(req,res)=> {
    res.render("homemodule/feedhome",{page:"HappyClash homefeed",url:req.url})
})

router.get('/challenge',(req,res)=> {
    res.render("homemodule/challenge",{url:req.url});
})

router.get("/songs", (req, res) => {
    res.render("homemodule/songs", {url: req.url})
})

router.get("/videomodeprivate", (req, res) => {
    res.render("homemodule/videomodeprivate", {url: req.url})
})
module.exports = router;