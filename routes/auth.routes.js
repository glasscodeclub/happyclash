var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var middlewares = require("../middlewares/auth.middleware");

router.get("/signup", function (req, res) {
    res.render("./Authmodule/pages/signup", { page: "HappyClash SignUp", err: { value: false } });
});


// router.post("/signup", function(req, res) {

//     User.register(new User({
//         username: req.body.username,
//         password_name: req.body.password,
//         email: req.body.email,
//         phone: req.body.phone
//     }), req.body.password, function (err, user) {
//         if (err) {
//             console.log(err);
//             return res.render('./Authmodule/pages/signup', { page: "HappyClash SignUp", err: { value: true } });
//         }
//         passport.authenticate("local")(req, res, function () {
//             res.redirect("/dashboard");
//         });
//     });
// });

router.post("/signup", async (req, res) => {
    let username = req.body.username;
    let password_name = req.body.password;
    let email = req.body.email;
    let phone = req.body.phone;

    let sameUsername = await User.findOne({ username: username });
    let sameEmail = await User.findOne({ email: email });
    let samePhone = await User.findOne({ phone: phone });
    let nameValue = false;
    let emailValue = false;
    let phoneValue = false;

    if (sameUsername) {
        nameValue = true;
    }

    if (sameEmail) {
        emailValue = true;
    }

    if (samePhone) {
        phoneValue = true;
    }

    User.register(new User({
        username,
        password_name,
        email,
        phone
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('./Authmodule/pages/signup', { 
                page: "HappyClash SignUp", err: { 
                    nameValue: nameValue, 
                    phoneValue: phoneValue, 
                    emailValue: emailValue 
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
