const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("./Notificationmodule/notification", { url: req.url })
})

module.exports = router;
