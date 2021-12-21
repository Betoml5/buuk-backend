const express = require("express");
const router = express.Router();
const controller = require("../controllers/User");

router.get("/all", controller.find);
router.get("/user/:id", controller.findOne);
router.get("/user/library/:id", controller.library);

router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);

router.post("/login", controller.login);
router.post("/create", controller.create);
router.post("/timeline", controller.addTimelineItem);
router.post("/library/:id", controller.addToLibrary)

router.delete("/library/:id", controller.removeFromLibrary)

module.exports = router;
