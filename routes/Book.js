const express = require("express");
const router = express.Router();
const controller = require("../controllers/Book");

router.get("/best", controller.bestSellers);
router.get("/search", controller.searchBook);

module.exports = router;
