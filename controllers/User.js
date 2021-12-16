const { response } = require("express");
const User = require("../models/User");
const responseHTTP = require("../network/response");

const controller = {
    create: async (req, res) => {
        const { user } = req.body;
        try {
            if (!user) {
                return responseHTTP.error(
                    req,
                    res,
                    { message: "Need user information" },
                    400
                );
            }
            const userCreated = await User.create(user);
            return responseHTTP.success(req, res, userCreated, 201);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    findOne: async (req, res) => {
        const { id } = req.body;
        try {
            const user = await User.findById(id);
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    update: async (req, res, next) => {
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
    addToLibrary: async (req, res) => {
        const { id, bookId } = req.query;
        try {
            const user = await User.findById(id);
            user.library.push(bookId);
            user.save();
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    removeFromLibrary: async (req, res) => {
        const { id, bookId } = req.query;
        try {
            const user = await User.findById(id);
            const bookIndex = user.library.indexOf(bookId);
            user.library.splice(bookIndex, 1);
            user.save();
            return response.succes(req, res, user, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
};

module.exports = controller;
