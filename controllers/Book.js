const { config } = require("../config");
const axios = require("axios");
const responseHTTP = require("../network/response");

const controller = {
    bestSellers: async (req, res) => {
        //Nota importante. La API de NYTIMES el path /overview devuelve imagen.
        //Es por eso que ya no hacemos 2 peticiones. Ya no utilizamos a OPENLIBRARY
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
    searchBook: async (req, res) => {
        const { title } = req.query;
        try {
            const {
                data: { docs },
            } = await axios.get(
                `${config.openlibraryApi}/search.json?title=${title}`
            );

            const firstDoc = docs[0] || [];
            const bookCover = `https://covers.openlibrary.org/b/lccn/${firstDoc.cover_i}-L.jpg`;

            const book = {
                title: firstDoc.title,
                subtitle: firstDoc.subtitle | " ",
                cover: bookCover,
                author: firstDoc.author_name,
            };

            return responseHTTP.success(req, res, book, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
};

module.exports = controller;
