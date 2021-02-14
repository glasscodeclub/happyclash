
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middlewares = require("../middlewares/auth");


router.get("/dashboard", middlewares.isLoggedIn, function(req, res){
    res.render("./Dashboardmodule/pages/dashboard");
})

module.exports = router;