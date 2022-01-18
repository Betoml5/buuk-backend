const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/Auth");

router.post("/refresh-token", controller.refreshToken);

module.exports = router;
