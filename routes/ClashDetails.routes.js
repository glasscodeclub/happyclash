const express = require("express");
const router = express.Router();
var { isLoggedIn } = require("../middlewares/auth.middleware");
const { follow, clashDetails, notAdminClashDetails, whenInvitedDetails,publicDetails,
    reportForm, report, profile, participants, comments, formComment, subComment
} = require("../controllers/clashDetails.controller")

router.route("/clash/:id")
    .get(isLoggedIn, clashDetails)


router.route("/profile/:username")
    .get(isLoggedIn, profile)

router.route("/follow")
    .post(isLoggedIn, follow)


router.route('/comments/:videoId')
    .get(isLoggedIn, comments)

router.route('/participants/:clashId')
    .get(isLoggedIn, participants)

router.get('/comments', (req, res) => {
    res.render("ClashDetailsmodule/clashComments", { url: req.url });
})

router.route("/formComment/:videoId")
    .post(isLoggedIn, formComment)

router.route("/subComment/:videoId")
    .post(isLoggedIn, subComment)

router.route('/reportClash/:id')
    .get(isLoggedIn, reportForm)
    .post(isLoggedIn, report)

module.exports = router;
