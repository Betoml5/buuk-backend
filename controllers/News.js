const axios = require("axios");
const { config } = require("../config");
const responseHTTP = require("../network/response");
const controller = {
    booksNews: async (req, res) => {
        try {
            const response = await axios.get(
                `${config.mediaStackApi}/news?access_key=${config.mediaStackKey}&keywords=libros&languages=es&country=mx`
            );
            const news = response.data;
            return responseHTTP.success(req, res, news, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },

    authorsNews: async (req, res) => {
        try {
            const response = await axios.get(
                `${config.mediaStackApi}/news?access_key=${config.mediaStackKey}&keywords=autores de libros&languages=es&country=mx`
            );
            const news = response.data;
            return responseHTTP.success(req, res, news, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
};

module.exports = controller;
