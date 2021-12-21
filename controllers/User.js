const { response } = require("express");
const User = require("../models/User");
const responseHTTP = require("../network/response");
const passport = require("passport");
const jwt = require("jsonwebtoken")
const { config } = require("../config")
const axios = require("axios")

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
            if (userValidate) return responseHTTP.error(req, res, { message: "This user already exists" }, 409)

            const userCreated = await User.create(user);
            return responseHTTP.success(req, res, userCreated, 201);
        } catch (error) {
            console.log(error)
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
                    return responseHTTP.error(req, res, { message: "Invalid password or email" }, 401);
                }
                req.login(user, { session: false }, async (err) => {
                    if (err) next(err);

                    const body = { id: user._id, username: user.username };
                    const token = jwt.sign({ user: body }, config.authJwtSecret)
                    return responseHTTP.success(req, res, { token, body }, 200)
                })
            } catch (error) {
                console.log(error)
                return responseHTTP.error(req, res, error, 500);
            }
        })(req, res, next)
    },
    addToLibrary: async (req, res) => {
        const { bookId } = req.query;
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            user.library.push(bookId);
            user.save({ new: true });
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {

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
            console.log(error)
            return responseHTTP.error(req, res, error, 500);
        }
    },
    addTimelineItem: async (req, res) => {
        const { item } = req.body;
        const { userId } = req.params;
        try {
            const user = await User.findById(userId);
            user.timeline.push(item);
            user.save();
            return responseHTTP.success(req, res, user, 200)
        } catch (error) {
            return responseHTTP.error(res, res, error, 500)
        }
    },
    removeTimelineItem: async (req, res) => {
        const { indexOf } = req.params;
        const { itemId } = req.query
        try {
            const user = await User.findById(id)
            const itemIndex = user.timeline.indexOf(itemId)
            user.timeline.splice(itemIndex, 1)
            user.save();
            return responseHTTP.success(req, res, user, 200)
        } catch (error) {
            return responseHTTP.error(req, res, error, 500)
        }
    },
    library: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return responseHTTP.error(req, res, { message: "No user found" }, 404)
            }
            const books = [];
            for (let i = 0; i < user.library.length; i++) {

                try {
                    const response = await axios.get(`https://openlibrary.org${user.library[i]}.json`);
                    const book = response.data;

                    books.push({
                        id: i,
                        cover: `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`,
                        description: book.description
                    })
                } catch (error) {
                    return responseHTTP.error(req, res, error, 500)
                }
            }

            return responseHTTP.success(req, res, books, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }

};

module.exports = controller;
