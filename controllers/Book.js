const { config } = require("../config");
const axios = require("axios");
const responseHTTP = require("../network/response");

const controller = {
    bestSellers: async (req, res, next) => {
        try {
            const response = await axios.get(
                `${config.nyApi}/lists/overview.json?api-key=gcWBKCOX8oLT4s5XXW5Iq0CXPRAC1IGH`
            );

            return responseHTTP.success(
                req,
                res,
                response.data.results.lists,
                200
            );
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
};

module.exports = controller;
