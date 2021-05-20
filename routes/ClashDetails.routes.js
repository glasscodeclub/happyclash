const express = require("express");
const router = express.Router();


router.get('/',(req,res)=> {
    res.render("ClashDetailsmodule/clashDetails",{url:req.url});
})

router.get("/notadmin", (req, res) => {
    res.render("ClashDetailsmodule/clashDetailsNotAdmin", {url:req.url})
})

router.get('/participants',(req,res)=> {
    res.render("ClashDetailsmodule/participants",{url:req.url});
})
router.get('/comments',(req,res)=> {
    res.render("ClashDetailsmodule/clashComments",{url:req.url});
})
router.get('/reportClash', (req, res)=>{
    res.render("ClashDetailsmodule/reportClash",{url:req.url});
})

// router.get('/alpha', (req, res)=>{
//     res.render("ClashDetailsmodule/alpha",{url:req.url});
// })
module.exports = router;
