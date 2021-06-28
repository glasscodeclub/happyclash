const express = require("express");
const router = express.Router();
var { isLoggedIn } = require("../middlewares/auth.middleware");
const Userdetail = require("../models/userdetails.models")
const Video = require("../models/video.models")
const url = require("url")
const _ = require("lodash");

const Clash = require('./../models/clash.models');

router.get('/', (req, res) => {
    res.render("ClashDetailsmodule/clashDetails", { url: req.url });
})

router.get("/notadmin", (req, res) => {
    res.render("ClashDetailsmodule/clashDetailsNotAdmin", { url: req.url })
})

router.get("/wheninvited", (req, res) => {
    res.render("ClashDetailsmodule/clashDetailsWhenInvited", { url: req.url })
})

router.get("/public", (req, res) => {
    res.render("ClashDetailsmodule/clashDetailsPublic", { url: req.url })
})

router.get("/profile/:username", async (req, res) => {
    try {
        const { username } = req.params
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })

        let docs = await Video.find({ _id: { $in: userDetails.videosCreated } })
        docs = docs.reverse().slice(0, 5)

        res.render("ClashDetailsmodule/profile", { url: req.url, videosArray: docs, userDetails })
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
})

router.get('/participants/:clashId', isLoggedIn  ,async (req, res) => {

    try {
        const clash = await Clash.findOne({ _id: req.params.clashId, username: req.user.username });

        if (_.isEmpty(clash)) return res.redirect(`/error?errorMessage=Clash Not Found`);
  
        let participantsDetailsPromiseArray = []; // followerDetails should be name
  
        //3) Now we need full details of follwers in order to render over page
        clash.participants.forEach(el => {
            participantsDetailsPromiseArray.push(Userdetail.findOne({ username: el }));
        })

        Promise.allSettled(participantsDetailsPromiseArray).then(data => {
            return res.render("ClashDetailsmodule/participants", { url: req.url, participantsDetails: data});     
         }).catch(err => {
            console.log(err);
            return res.redirect(`/error?errorMessage=${err}`);
         })

    } catch (err) {
        console.log(err);
        res.redirect(`/error?errorMessage=${err}`);
    }
})
router.get('/comments', (req, res) => {
    res.render("ClashDetailsmodule/clashComments", { url: req.url });
})
router.get('/reportClash', (req, res) => {
    res.render("ClashDetailsmodule/ReportClash", { url: req.url });
})

// router.get('/alpha', (req, res)=>{
//     res.render("ClashDetailsmodule/alpha",{url:req.url});
// })
module.exports = router;
