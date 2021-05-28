const express = require('express');
var router = express.Router();
const multer = require("multer");
const { isLoggedIn } = require('../middlewares/auth.middleware');
 const uuid=require("uuid").v4
 const Video=require("../models/video.models")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //assume exists path dir else use fs-extra
        cb(null, "video/")
    },
    filename: function (req, file, cb) {
        var new_video = new Video({
            username:req.user.username,
            videoName:file.originalname.split(".")[0],
          })
          const filename=`${file.originalname.split(".")[0]}_${req.user.username}_${new_video._id}.${file.mimetype.split("/")[1]}`; 
          new_video.save(function(err,result){
              if (err){
                  console.log(err);
              }
              else{
                  cb(null, filename)
              }
          })
    }
})
const upload = multer({storage});

router.get("/",isLoggedIn, function(req, res){
    res.render("Uploadmodule/upload");
})


router.post("/", isLoggedIn,upload.single('videoFile'), (req, res) => {
    res.redirect('/library');
})

module.exports = router;
