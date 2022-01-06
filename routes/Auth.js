const router = require("express").Router();
const passport = require("passport");

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res, next) => {
        res.send("http://192.168.1.64:19000");
    }
);

module.exports = router;
