const express = require('express');
var router = express.Router();
const multer = require("multer");
const { createTestAccount } = require('nodemailer');
const { isLoggedIn } = require('../middlewares/auth.middleware');
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
          const filename=`${new_video._id}.${file.mimetype.split("/")[1]}`; 
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

const upload = multer({storage}).single('videoFile');
router.get("/",isLoggedIn, function (req, res) {
    res.render("./Cameramodule/camera", { url: req.url });
})

router.post("/",isLoggedIn ,function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
        } else if (err) {
          // An unknown error occurred when uploading.
        }   
         res.redirect('/library');
      })
})

module.exports=router