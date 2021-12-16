const express = require("express");
const router = express.Router();
const controller = require("../controllers/User");

router.get("/", controller.find);
router.get("/user/:id", controller.findOne);

router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);

module.exports = router;
