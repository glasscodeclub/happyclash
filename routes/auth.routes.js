var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var middlewares = require("../middlewares/auth.middleware");

router.get("/signup", function (req, res) {
    res.render("./Authmodule/pages/signup", { page: "HappyClash SignUp", err: { value: false,error:null } });
});

router.post("/signup", async (req, res) => {

    User.register(new User({
        username: req.body.username,
        password_name: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('./Authmodule/pages/signup', { 
                page: "HappyClash SignUp", err: { 
                    error:err,
                } 
            });
        }

        passport.authenticate("local")(req, res, function () {
            res.redirect("/dashboard");
        });
    });
});

router.get("/login", function (req, res) {
    res.render("./Authmodule/pages/login", { page: "HappyClash Login" });
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login"
}), function (req, res) {
    res.send("User is " + req.user.id);
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


module.exports = router;
