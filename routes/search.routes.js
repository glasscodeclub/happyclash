const express = require("express");
const router = express.Router();
var middlewares = require("../middlewares/auth.middleware");

router.get("/", (req, res) => {
    res.render("Searchmodule/search", { url: req.url })
})

router.get("/keyword", (req, res) => {
    res.render("Searchmodule/searchkeyword", { url: req.url })
})

module.exports = router;
