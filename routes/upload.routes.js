const express = require('express');
var router = express.Router();
const multer = require("multer");
var middlewares = require("../middlewares/auth.middleware");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/private")
//     },
//     filename: function (req, file, cb) {
//         const parts = file.mimetype.split("/");
//         cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
//     }
// })

// const upload = multer({storage});

router.get("/",middlewares.isLoggedIn, function(req, res){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/private")
        },
        filename: function (req, file, cb) {
            const parts = file.mimetype.split("/");
            cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
        }
    })
    const upload = multer({storage});
    res.render("Uploadmodule/upload");
})

module.exports = router;
