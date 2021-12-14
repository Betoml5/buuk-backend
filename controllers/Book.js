const { config } = require("../config");
const axios = require("axios");
const responseHTTP = require("../network/response");

const controller = {
    bestSellers: async (req, res) => {
        try {
            setTimeout(async () => {
                const response = await axios.get(
                    `${config.nyApi}/lists/overview.json?api-key=${config.nykey}`
                );

                return responseHTTP.success(
                    req,
                    res,
                    response.data.results.lists,
                    200
                );
            }, 5000);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    // searchBook: async (req,res) => {
    //     const { q } = req.query;
    //     try {
    //         const
    //     } catch (error) {

    //     }
    // }
};

module.exports = controller;
