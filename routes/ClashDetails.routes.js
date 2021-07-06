const express = require("express");
const router = express.Router();
var { isLoggedIn } = require("../middlewares/auth.middleware");
const { follow, clashDetails, notAdminClashDetails, whenInvitedDetails,publicDetails,
    reportForm, report, profile, participants, comments, formComment, subComment
} = require("../controllers/clashDetails.controller")

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

router.route('/comments/:videoId')
    .get(isLoggedIn, comments)

router.route("/formComment/:videoId")
    .post(isLoggedIn, formComment)

router.route("/subComment/:videoId")
    .post(isLoggedIn, subComment)

router.route('/reportClash/:id')
    .get(isLoggedIn, reportForm)
    .post(isLoggedIn, report)

// router.get('/alpha', (req, res)=>{
//     res.render("ClashDetailsmodule/alpha",{url:req.url});
// })
module.exports = router;
