const axios = require("axios");
const { config } = require("../config");
const responseHTTP = require("../network/response");
const controller = {
    booksNews: async (req, res) => {
        try {
            const options = {
                method: "GET",
                url: "https://free-news.p.rapidapi.com/v1/search",
                params: {
                    q: "libros",
                    lang: "es",
                    page: "1",
                    page_size: "25",
                },
                headers: {
                    "x-rapidapi-key": `${config.freeNewsKey}`,
                    "x-rapidapi-host": "free-news.p.rapidapi.com",
                },
            };

            setTimeout(async () => {
                const response = await axios.request(options);
                const news = response.data;
                return responseHTTP.success(req, res, news, 200);
            }, 5000);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },

    authorsNews: async (req, res) => {
        try {
            var options = {
                method: "GET",
                url: "https://free-news.p.rapidapi.com/v1/search",
                params: { q: "autores de libros", lang: "es" },
                headers: {
                    "x-rapidapi-host": "free-news.p.rapidapi.com",
                    "x-rapidapi-key": `${config.freeNewsKey}`,
                },
            };
            setTimeout(async () => {
                const response = await axios.request(options);
                const news = response.data;
                return responseHTTP.success(req, res, news, 200);
            }, 5000);
        } catch (error) {
            console.log(error.message);
            return responseHTTP.error(req, res, error, 500);
        }
    },
};

module.exports = controller;
