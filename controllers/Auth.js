const jwt = require("jsonwebtoken");
const { config } = require("../config");
const responseHTTP = require("../network/response");
const User = require("../models/User");

const controller = {
    refreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.body.refreshToken;
            jwt.verify(
                refreshToken,
                config.authJwtRefreshSecret,
                async function (err, decode) {
                    if (err) {
                        return responseHTTP.error(req, res, err, 400);
                    } else {
                        const user = await User.findById(decode.user).select(
                            "-password"
                        );
                        const token = jwt.sign(
                            { user: decode.user },
                            config.authJwtSecret,
                            { expiresIn: "30s" }
                        );
                        const refreshToken = req.body.refreshToken;
                        return responseHTTP.success(
                            req,
                            res,
                            {
                                token,
                                refreshToken,
                                user,
                                message: "Token refreshed",
                            },
                            200
                        );
                    }
                }
            );
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
};

module.exports = controller;
