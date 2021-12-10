const User = require("../models/User");
const response = require("../network/response");

const controller = {
  create: async (req, res, next) => {
    const { user } = req.body;
    try {
      if (!user) {
        return response.error(
          req,
          res,
          { message: "Need user information" },
          400
        );
      }

      const userCreated = await User.create(user);
      return response.success(req, res, userCreated, 201);
    } catch (error) {
      return response.error(req, res, error, 500);
    }
  },
  findOne: async (req, res, next) => {
    const { id } = req.body;
    try {
      const user = await User.findById(id);
      return response.success(req, res, user, 200);
    } catch (error) {
      return response.error(req, res, error, 500);
    }
  },
  update: async (req, res, next) => {
    const { user } = req.body;
    const { id } = req.params;
    try {
      if (!user) {
        return response.error(
          req,
          res,
          { message: "Need user to update" },
          400
        );
      }

      const userUpdated = await User.findByIdAndUpdate(id, user, { new: true });
      return response.success(req, res, userUpdated);
    } catch (error) {
      return response.error(req, res, error, 500);
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndRemove(id, { new: true });
      return response.success(req, res, user, 200);
    } catch (error) {
      return response.error(req, res, error, 500);
    }
  },

  find: async (req, res, next) => {
    try {
      const users = await User.find({});
      return response.success(req, res, users, 200);
    } catch (error) {
      return response.error(req, res, error, 500);
    }
  },
};

module.exports = controller;
