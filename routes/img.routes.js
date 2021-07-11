
var express = require("express");
const { isLoggedIn } = require("../middlewares/auth.middleware");
var router = express.Router();


router.get("/:id", isLoggedIn,function(req, res){
    if(req.params.id){
         res.sendFile(req.params.id+".jpeg", { root: "./img" },(err)=>{
            if (err) {
               console.log(err)
            }
            else {
            }
         });  
    }
    else{
        res.json({error:"null id"})
    }

})


module.exports = router;