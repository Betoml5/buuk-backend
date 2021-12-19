const express = require("express");
const router = express.Router();
const controller = require("../controllers/User");

router.get("/all", controller.find);
router.get("/user/:id", controller.findOne);

router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);

router.post("/signin", controller.login);
router.post("/create", controller.create);
router.post("/timeline", controller.addTimelineItem);

module.exports = router;
