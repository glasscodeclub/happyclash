const express = require("express");
const router = express.Router();
var { isLoggedIn } = require("../middlewares/auth.middleware");
const Userdetail = require("../models/userdetails.models")
const Clashs = require("../models/clash.models")
const Video = require("../models/video.models")
const Report = require("../models/report.models")
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

router.get("/profile/:username", isLoggedIn, async (req, res) => {
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

router.get('/reportClash/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    res.render("ClashDetailsmodule/ReportClash", { url: req.url, id });
})

router.post("/reportClash/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params
    const { username, email } = req.user
    const { message } = req.body
    const reasons = []
    try {
        Object.keys(req.body).forEach(ele => {
            if (ele.includes("reason")) reasons.push(req.body[ele])
        })

        const clash = await Clashs.findOne({ _id: { $eq: id } })
        if (!clash) throw "Their is no clash with this reference id"

        const { isSeenByAllForFriends, mode, _id } = clash
        if (mode === "Public" || (mode === "Friend" && isSeenByAllForFriends)) {
            const newReport = new Report({
                username, email, message, for: reasons, clashAdmin: clash.username, clashId: _id, status: false
            })
            await newReport.save()
        } else {
            const present = clash.view.filter(user => user === username)
            if (present.length === 0) throw "You don't have access to report this clash"
            else {
                const newReport = new Report({
                    username, email, message, for: reasons, clashAdmin: clash.username, clashId: _id, status: false
                })
                await newReport.save()
            }
        }
        res.redirect("/library")
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

// router.get('/alpha', (req, res)=>{
//     res.render("ClashDetailsmodule/alpha",{url:req.url});
// })
module.exports = router;
