
var express = require("express");
var router = express.Router();
var createClashController = require('./../controllers/createclash.controller');
const { isLoggedIn } = require("../middlewares/auth.middleware");


router.route('/createNewClash')
    .get(isLoggedIn ,createClashController.getCreateNewClashPage)
    .post(isLoggedIn ,createClashController.createClash);

router.route("/clashcreated/:clashId")
    .get(isLoggedIn, createClashController.getClashCreatedPage);

router.route('/addParticipants/:clashId')
    .get(isLoggedIn, createClashController.getAddParticipantsPage)
    .post(isLoggedIn, createClashController.addParticipants);

router.route("/whocanwatch/:clashId")
    .get(isLoggedIn, createClashController.getWhoCanWatchPage)
    .post(isLoggedIn, createClashController.addViewers);

router.route("/deleteClash/:clashId").delete(isLoggedIn, createClashController.deleteClash);

router.route("/search/:key").get(createClashController.getAllByNames);

module.exports = router;