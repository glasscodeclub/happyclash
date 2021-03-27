var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var middlewares = require("../middlewares/auth.middleware");
const fs = require("fs")
const async=require("async")


router.get("/signup", function (req, res) {
    res.render("./Authmodule/signup", { page: "HappyClash SignUp", err: { value: false,error:null } });
});

router.post("/signup", async (req, res) => {
   if(req.body){
    async.parallel([
        cb=> {
            fs.mkdir("./upload/"+req.body.username+"/public", { recursive: true }, function(err) {
                if (err) {
                    return cb(err)
                } else {
                    return cb();
                }
              })
        },
        cb=> {
            fs.mkdir("./upload/"+req.body.username+"/private", { recursive: true }, function(err) {
                if (err) {
                    return cb(err)
                } else {
                    return cb();
                }
              })
        },
        cb => {
            User.register(new User({
                username: req.body.username,
                password_name: req.body.password,
                email: req.body.email,
                phone: req.body.phone
            }), req.body.password, function (err, user) {
                if (err) {
                   return cb(err);
                }
                else{
                    return cb();
                }
            });
        }
    ], err => {
        if (err) {
            return res.render('./Authmodule/signup', { 
                page: "HappyClash SignUp", err: { 
                    error:err,
                } 
            });
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/dashboard");
            });
        }
    })
   }
    
  
});

router.get("/login", function (req, res) {
    res.render("./Authmodule/login", { page: "HappyClash Login" });
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/upload",
    failureRedirect: "/auth/login"
}), function (req, res) {
    res.send("User is " + req.user.id);
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


module.exports = router;
