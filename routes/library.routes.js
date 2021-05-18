var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var middlewares = require("../middlewares/auth.middleware");


router.get("/", function (req, res) {
    res.render("Librarymodule/library",{url:req.url});
})

router.get("/videomodelibrary",function(req,res){
    res.render("Librarymodule/VideoModeLibrary",{})
})
module.exports = router;