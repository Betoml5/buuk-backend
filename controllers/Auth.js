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
        const { email } = req.body;

        if (!email) {
            return responseHTTP.error(
                req,
                res,
                { message: "Missing email" },
                401
            );
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return responseHTTP.error(
                req,
                res,
                { message: "Unauthorized" },
                401
            );
        }

        const token = jwt.sign({ id: user._id }, config.authJwtSecret, {
            expiresIn: "15m",
        });

        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                secure: true,
                port: 465,
                auth: {
                    user: config.gmailEmail,
                    pass: config.gmailPassword,
                },
            });

            let info = await transporter.sendMail({
                from: config.gmailEmail, // sender address
                to: email, // list of receivers
                subject: "Recuperacion de contraseña", // Subject line
                text: `¡Hola! ${email}`, // plain text body
                html: `<b>Hola ${user.username}  <a href='http://127.0.0.1:5500/index.html?token=${token}'>Ingresa a este link para cambiar tu contrasena</a></b>`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

            return responseHTTP.success(req, res, { message: "OK" }, 200);
        } catch (error) {

            return responseHTTP.error(req, res, error, 500);
        }
    },

    changePassword: async (req, res) => {

        const { password, id } = req.body;
        const { token } = req.params;

        const payload = jwt.verify(token, config.authJwtSecret)

        if (!payload) {
            return responseHTTP.error(req, res, { message: "Server error" }, 401)
        }

        try {
            const user = await User.findById(id);
            user.password = password;
            user.save({ new: true });
            return responseHTTP.success(req, res, user, 200)
        } catch (error) {
            return responseHTTP.error(req, res, { message: "Server error" }, 500)
        }
    }
};

module.exports = controller;
