const express = require('express');
var router = express.Router();
const multer = require("multer");
const { isLoggedIn } = require('../middlewares/auth.middleware');
 var middlewares = require("../middlewares/auth.middleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //assume exists path dir else use fs-extra
        cb(null, "upload/"+req.user.username+"/public")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})
const upload = multer({storage});

router.get("/",isLoggedIn, function(req, res){
    res.render("Uploadmodule/upload");
})


router.post("/", isLoggedIn,upload.single('videoFile'), (req, res) => {
    res.send("image got saved");
})

module.exports = router;
