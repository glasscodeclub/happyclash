
var express = require("express");
var router = express.Router();
var {isLoggedIn}=require("../middlewares/auth.middleware")


router.get("/:id", function(req, res){//sv
    if(req.params.id){
         res.sendFile(req.params.id+".mp4", { root: "./video" });  
    }
    else{
        res.json({error:"null id"})
    }

})


module.exports = router;