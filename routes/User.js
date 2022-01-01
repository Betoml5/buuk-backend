const express = require("express");
const router = express.Router();
const controller = require("../controllers/User");
const passport = require("passport");

router.get(
    "/all",
    passport.authenticate("jwt", { session: false }),
    controller.find
);
router.get("/user/:id", controller.findOne);

router.put(
    "/update/:id",
    passport.authenticate("jwt", { session: false }),
    controller.update
);
router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    controller.delete
);

router.post("/login", controller.login);
router.post("/create", controller.create);
router.patch(
    "/timeline/:id",
    passport.authenticate("jwt", { session: false }),
    controller.addTimelineItem
);
router.post(
    "/library/:id",
    passport.authenticate("jwt", { session: false }),
    controller.addToLibrary
);
router.delete(
    "/library/:id",
    passport.authenticate("jwt", { session: false }),
    controller.removeFromLibrary
);

module.exports = router;
