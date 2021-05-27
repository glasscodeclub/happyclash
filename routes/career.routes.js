
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
router.get('/profile',(req,res)=> {
    res.render("./Careermodule/profile",{url:req.url});
})
router.get('/notification',(req,res)=> {
    res.render("./Careermodule/notification",{url:req.url});
})
router.get("/admincontrols", (req, res) => {
    res.render("./Careermodule/admincontrols", { url: req.url })
})
router.get("/results", (req, res) => {
    res.render("./Careermodule/results", { url: req.url })
})

router.get("/congratulations", (req, res) => {
    res.render("./Careermodule/congratulations", { url: req.url })
})

module.exports = router;