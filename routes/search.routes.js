const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("./Sai/search", { url: req.url })
})

module.exports = router;
