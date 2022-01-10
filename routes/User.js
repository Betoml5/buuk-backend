const express = require("express");
const router = express.Router();
const controller = require("../controllers/User");
const middlewares = require("../middlewares");

router.get("/all", controller.find);
router.get("/user/:id", controller.findOne);
router.put("/update/:id", middlewares.verifyAuth, controller.update);
router.delete("/delete/:id", middlewares.verifyAuth, controller.delete);

router.post("/login", controller.login);
router.post("/create", controller.create);
router.patch(
    "/timeline/:id",
    middlewares.verifyAuth,
    controller.addTimelineItem
);
router.post("/library/:id", middlewares.verifyAuth, controller.addToLibrary);
router.delete(
    "/library/:id",
    middlewares.verifyAuth,
    controller.removeFromLibrary
);

module.exports = router;
