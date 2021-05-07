const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("./Sai/admincontrols", { url: req.url })
})

module.exports = router;
