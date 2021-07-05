const express = require("express");
const router = express.Router();
var { isLoggedIn } = require("../middlewares/auth.middleware");
const { follow, clashDetails, notAdminClashDetails, whenInvitedDetails, publicDetails, reportForm, report, profile, participants } = require("../controllers/clashDetails.controller")

router.route("/clash/:id")
    .get(isLoggedIn, clashDetails)

router.route("/notadmin/:id")
    .get(isLoggedIn, notAdminClashDetails)

router.route("/wheninvited/:id")
    .get(isLoggedIn, whenInvitedDetails)

router.route("/public/:id")
    .get(isLoggedIn, publicDetails)

router.route("/profile/:username")
    .get(isLoggedIn, profile)

router.route("/follow")
    .post(isLoggedIn, follow)

router.route('/participants/:clashId')
    .get(isLoggedIn, participants)

router.get('/comments', (req, res) => {
    res.render("ClashDetailsmodule/clashComments", { url: req.url });
})

router.route('/reportClash/:id')
    .get(isLoggedIn, reportForm)
    .post(isLoggedIn, report)

router.post("/reportClash/:id", isLoggedIn, )

// router.get('/alpha', (req, res)=>{
//     res.render("ClashDetailsmodule/alpha",{url:req.url});
// })
module.exports = router;
