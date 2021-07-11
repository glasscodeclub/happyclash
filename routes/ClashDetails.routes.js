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


router.route('/comments/:videoId')
    .get(isLoggedIn, comments)

router.route('/participants/:clashId')
    .get(isLoggedIn, participants)

router.get('/comments', (req, res) => {
    res.render("ClashDetailsmodule/clashComments", { url: req.url });
})

router.get('/reportClash/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    let query ={};
    query={_id:id,
        $or:[
            {mode:"Friend",isSeenByAllForFriends:true},

            {mode:"Public"},

            {mode:"Friend",isSeenByAllForFriends:false,$or:[{username:req.user.username},{view:req.user.username}]},
        ]};
    Clashs.findOne(query,(err,doc)=>{
        if(err){
            res.redirect(`/error?errorMessage=${err}`);
        }
        else if(_.isEmpty(doc)){
            res.redirect(`/error?errorMessage=clash not accessible`);
        }
        else{
            res.render("ClashDetailsmodule/ReportClash", { url: req.url, id });
        }
    })
    
})


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
