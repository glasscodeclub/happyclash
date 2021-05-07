
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var middlewares = require("../middlewares/auth.middleware");


router.get("/:id", function(req, res){
    res.sendFile('/'+req.params.id+".mp4", { root: "./video" });
})

module.exports = router;