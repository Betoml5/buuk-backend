const express = require("express");
const router = express.Router();
const controller = require("../controllers/Book");

router.get("/best", controller.bestSellers);
router.get("/search", controller.searchBook);
router.get("/search/subject", controller.searchBooksBySubject);

module.exports = router;
