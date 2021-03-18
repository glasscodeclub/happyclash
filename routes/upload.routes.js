const express = require('express');
var router = express.Router();
const multer = require("multer");
// var middlewares = require("../middlewares/auth.middleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/public")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})
const upload = multer({storage});

router.get("/", function(req, res){
    res.render("Uploadmodule/upload");
})


router.post("/", upload.single("image"), (req, res) => {
    res.send("image got saved");
})

module.exports = router;
