var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.models");
var middlewares = require("../middlewares/auth.middleware");
const fs = require("fs")
const async=require("async")
var randomstring = require("randomstring");
var _=require("lodash")
var Email=require("../lib/email.lib")

router.get("/signup", function (req, res) {
    if(req.query&&req.query.incorrect&&req.query.incorrect=="yes"&&req.query.userid){
        //updation resend new 
            res.render("./Authmodule/signup", { page: "HappyClash SignUp", err: { value: false,error:null,message:"incorrect link check mail for correct link" } }); 
    }
    else{
        res.render("./Authmodule/signup", { page: "HappyClash SignUp", err: { value: false,error:null,message:false } });
    }   
});

router.get("/:userid/:string", function (req, res) {
    if(req.params.userid&&req.params.string)
     User.findOneAndUpdate({randomString:req.params.string,_id:req.params.userid},{isVerfied:true},(err,doc)=>{
        if(err){
         console.log(err)
         res.redirect('/error');   
        }
        else if(_.isEmpty(doc)){
            let data=encodeURIComponent('yes')
            res.redirect('/auth/signup?incorrect='+data+'&userid='+req.params.userid);  
        }
        else{
            let data=encodeURIComponent('yes')
            res.redirect('/auth/login?verify='+data);      
        }
     }) 
});

router.post("/signup", async (req, res) => {
   if(req.body){
    let data={};
    async.series([
        // cb=> {
        //     fs.mkdir("./upload/"+req.body.username+"/public", { recursive: true }, function(err) {
        //         if (err) {
        //             return cb(err)
        //         } else {
        //             return cb();
        //         }
        //       })
        // },
        // cb=> {
        //     fs.mkdir("./upload/"+req.body.username+"/private", { recursive: true }, function(err) {
        //         if (err) {
        //             return cb(err)
        //         } else {
        //             return cb();
        //         }
        //       })
        // },
        cb => {
            var string=randomstring.generate({length:64});
            User.register(new User({
                username: req.body.username,
                password_name: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                randomString:string,
            }), req.body.password, function (err, user) {
                if (err) {
                   return cb(err);
                }
                else{
                    data=user;
                    return cb();
                }
            });
        },
        cb => {
            var text="http://localhost:3000/auth/"+data._id+"/"+data.randomString;
            let input={};
            input.email=data.email
            input.text=text;
            Email.hcSendMail(input,(err,data)=>{
                if(err){
                    return cb(err)
                }
                else{
                   return  cb();
                }
            });
        }
    ], err => {
        if (err) {
            return res.render('./Authmodule/signup', { 
                page: "HappyClash SignUp", err: { 
                    error:err,
                    message:false,
                } 
            });
        } else {
            res.redirect("/auth/login?verify=no");
        }
    })
   }
    
  
});

router.get("/login", function (req, res) {
    if(req.query&&req.query.verify&&req.query.verify=="yes"){
        res.render("./Authmodule/login", { page: "HappyClash Login",message:"email verified" });
    }
    else if(req.query&&req.query.verify&&req.query.verify=="no"){
        res.render("./Authmodule/login", { page: "HappyClash Login",message:"email not verified" });
    }
    else{
    res.render("./Authmodule/login", { page: "HappyClash Login",message:false });
    }
})

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/auth/login",//wrong password query
}), function (req, res) {
    User.findOne({username:req.user.username,isVerfied:true},(err,doc)=>{
      if(err){
       console.log(err)
       res.redirect("/error");
      }
      else if(_.isEmpty(doc)){
        res.redirect("/auth/login?verify=no");
      }
      else{
        res.redirect("/library");
      }
    })
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


module.exports = router;
