const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers/Auth");

router.post("/refresh-token", controller.refreshToken);
router.post("/forgot-password", controller.forgotPassword);
router.put("/change-password", controller.changePassword);

module.exports = router;
