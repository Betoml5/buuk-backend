const jwt = require("jsonwebtoken");
const { config } = require("../config");
const responseHTTP = require("../network/response");
const User = require("../models/User");
const nodemailer = require("nodemailer");

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

    forgotPassword: async (req, res) => {
        try {
            let testAccount = await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                secure: true,
                port: 465,
                auth: {
                    user: "betoml397@gmail.com",
                    pass: "fzrvdpsieytfemqt",
                },
            });

            let info = await transporter.sendMail({
                from: "betoml397@gmail.com", // sender address
                to: "betoml5@hotmail.com", // list of receivers
                subject: "Este es un nuevo correo", // Subject line
                text: "Hola", // plain text body
                html: "<b>Hola mundo?</b>", // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

            return responseHTTP.success(req, res, { message: "OK" }, 200);
        } catch (error) {
            console.log(error);
            return responseHTTP.error(req, res, error, 500);
        }
    },
};

module.exports = controller;
