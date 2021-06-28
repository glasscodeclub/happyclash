var express = require("express");
var router = express.Router();;
const { isLoggedIn } = require("../middlewares/auth.middleware");
var Video = require("../models/video.models")
var _ = require("lodash");
const fs = require('fs')
const url = require("url")

router.get("/", isLoggedIn, function (req, res) {
    Video.find({ username: req.user.username }, (err, docs) => {
        if (err) {
            console.log(err);
            res.redirect(url.format({
                pathname: "/error",
                query: {
                    message: err.message,
                    status: 404
                }
            }));
        }
        else if (_.isEmpty(docs)) {
            res.render("Librarymodule/library", { url: req.url, username: req.user.username, videoModelArray: [] });
        }
        else {
            res.render("Librarymodule/library", { url: req.url, username: req.user.username, videoModelArray: docs });
        }
    })
})

router.post("/delete/:id", isLoggedIn, function (req, res) {
    if (req.params.id == "") {
        //error handling
    }
    else {
        Video.deleteOne({ _id: req.params.id, username: req.user.username }, (err) => {
            if (err) {
                console.log(err)
                res.redirect(url.format({
                    pathname: "/error",
                    query: {
                        message: err.message,
                        status: 404
                    }
                }));
            }
            else {

                const path = './video/' + req.params.id + '.mp4'

                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err)
                    }
                })
                res.redirect("/library");
            }
        })
    }
})

router.get("/videomodelibrary/:id", isLoggedIn, function (req, res) {
    if (req.params.id == "") {
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message || "Video id is required",
                status: 404
            }
        }));
    }
    else {
        Video.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log(err)
                res.redirect(url.format({
                    pathname: "/error",
                    query: {
                        message: err.message,
                        status: 404
                    }
                }));
            }
            else if (_.isEmpty(doc)) {
                res.send("no file exists")
            }
            else {
                res.render("Librarymodule/VideoModeLibrary", { url: req.url, username: req.user.username, videoModel: doc })
            }
        })
    }
})

module.exports = router;
