const express = require("express");
const router = express.Router();
const controller = require("../controllers/News");
router.get("/books", controller.booksNews);
router.get("/authors", controller.authorsNews);

module.exports = router;
