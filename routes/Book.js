const express = require("express");
const router = express.Router();
const controller = require("../controllers/Book");

router.get("/best", controller.bestsellers);

module.exports = router;
