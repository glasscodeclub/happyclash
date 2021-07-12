const express = require('express');
var router = express.Router();
const multer = require("multer");
const { isLoggedIn } = require('../middlewares/auth.middleware');
const _=require("lodash")
 const Userdetail=require("../models/userdetails.models")
 const fs=require("fs")

const Imgstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        //assume exists path dir else use fs-extra
        cb(null, "img/")
    },
    filename: function (req, file, cb) {
        let data={};
          Userdetail.findOne({username:req.user.username},(err,doc)=>{
              if(err){
                  console.log(err);
              }
              else if(_.isEmpty(doc)){
                 console.log("user not found")
              }
              else{
                  data.id=doc._id;
                  data.profilePic=doc.profilePic;
                const filename=`${doc._id}.${file.mimetype.split("/")[1]}`; 
                  Userdetail.updateOne({username:req.user.username},{ profilePic:doc._id},(err,doc)=>{
                        if(err){
                            console.log(err);
                        }
                        else if(_.isEmpty(doc)){
                        console.log("user not found")
                        }
                        else{ 
                            if(data.profilePic!="sample"){
                                const path = './img/' + data.id + '.jpeg'
                                fs.unlink(path, (err) => {
                                    if (err) {
                                        console.error(err)
                                    }
                                })
                             } 
                          cb(null, filename)
                        }
                  })
              }
          })
    }
})
const upload = multer({storage: Imgstorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    // fileFilter(req, file, cb) {
    //   if (!file.originalname.match(/\.(png|jpeg)$/)) { 
    //      // upload only png and jpg format
    //      return cb(new Error('Please upload a Image'))
    //    }
    //  cb(undefined, true)
//  }
});

router.get("/",isLoggedIn, function(req, res){
    res.render("Uploadmodule/uploadimg", { url: req.url });
})


router.post("/", isLoggedIn,upload.single('imgFile'), (req, res) => {
    res.redirect('/career/edit');
})

module.exports = router;
