const { response } = require("express");
const User = require("../models/User");
const responseHTTP = require("../network/response");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { config } = require("../config");
const axios = require("axios");

const controller = {
    create: async (req, res) => {
        const { user } = req.body;
        try {
            if (!user) {
                return responseHTTP.error(
                    req,
                    res,
                    { message: "Missing information" },
                    400
                );
            }
            const userValidate = await User.findOne({ user: user.email });
            if (userValidate)
                return responseHTTP.error(
                    req,
                    res,
                    { message: "This user already exists" },
                    409
                );

            const userCreated = await User.create(user);
            return responseHTTP.success(req, res, userCreated, 201);
        } catch (error) {
            console.log(error);
            return responseHTTP.error(req, res, error, 500);
        }
    },
    findOne: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    update: async (req, res) => {
        const { user } = req.body;
        const { id } = req.params;
        try {
            if (!user) {
                return responseHTTP.error(
                    req,
                    res,
                    { message: "Need user to update" },
                    400
                );
            }
            const userUpdated = await User.findByIdAndUpdate(id, user, {
                new: true,
            });
            return responseHTTP.success(req, res, userUpdated);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndRemove(id, { new: true });
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },

    find: async (req, res) => {
        try {
            const users = await User.find({});
            return responseHTTP.success(req, res, users, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    login: async (req, res, next) => {
        passport.authenticate("login", async (err, user, info) => {
            try {
                if (err | !user) {
                    return responseHTTP.error(
                        req,
                        res,
                        { message: "Invalid password or email" },
                        401
                    );
                }
                req.login(user, { session: false }, async (err) => {
                    if (err) next(err);

                    const body = { user };
                    const token = jwt.sign(
                        { user: body },
                        config.authJwtSecret
                    );
                    return responseHTTP.success(req, res, { token, body }, 200);
                });
            } catch (error) {
                console.log(error);
                return responseHTTP.error(req, res, error, 500);
            }
        })(req, res, next);
    },
    addToLibrary: async (req, res) => {
        const { bookId } = req.query;
        const { id } = req.params;
        try {
            const bookResponse = await axios.get(
                `https://openlibrary.org/${bookId}.json`
            );
            const book = {
                id: bookResponse.data?.key,
                title: bookResponse.data.title,
                cover: `https://covers.openlibrary.org/b/id/${bookResponse.data?.covers[0]}-L.jpg`,
                description: bookResponse.data?.description,
                numberPages: 0,
            };
            const user = await User.findById(id);
            user.library.push(book);
            user.save({ new: true });
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            console.log(error);
            return responseHTTP.error(req, res, error, 500);
        }
    },
    removeFromLibrary: async (req, res) => {
        const { bookId } = req.query;
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            const bookIndex = user.library.indexOf(bookId);
            user.library.splice(bookIndex, 1);
            user.save();
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            console.log(error);
            return responseHTTP.error(req, res, error, 500);
        }
    },
    addTimelineItem: async (req, res) => {
        const { item } = req.body;
        const { id } = req.params;
        try {
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            const date = new Date().getDate();
            const fullDate = new Date().toLocaleDateString("es-MX", options);
            fullDate.charAt(0).toUpperCase();
            item.fulldate = fullDate;
            item.date = date;
            const user = await User.findById(id);
            user.pagescount = user.pagescount + item.book.numberPages;
            user.timeline.push(item);
            user.save();
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            console.log(error);
            return responseHTTP.error(res, res, error, 500);
        }
    },
    removeTimelineItem: async (req, res) => {
        const { indexOf } = req.params;
        const { itemId } = req.query;
        try {
            const user = await User.findById(id);
            const itemIndex = user.timeline.indexOf(itemId);
            user.timeline.splice(itemIndex, 1);
            user.save();
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
};

module.exports = controller;
