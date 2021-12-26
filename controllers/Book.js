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

            const books = [];
            for (let i = 0; i < docs.length; i++) {
                if (docs[i].cover_i !== undefined) {
                    books.push({
                        id: i,
                        work_id: docs[i].key,
                        title: docs[i].title,
                        subtitle: docs[i].subtitle | " ",
                        cover: `https://covers.openlibrary.org/b/id/${docs[i].cover_i}-L.jpg`,
                    });
                }
            }
            return responseHTTP.success(req, res, books, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    searchBooksBySubject: async (req, res) => {
        const { q } = req.query;
        try {
            const response = await axios.get(`http://openlibrary.org/subjects/${q}.json?details=true&limit=20`);
            const works = response.data.works;
            const books = [];
            for (let i = 0; i < works.length; i++) {
                books.push({
                    id: works[i].key,
                    title: works[i].title,
                    cover: `https://covers.openlibrary.org/b/id/${works[i].cover_id}-L.jpg`,

                })
            }
            return responseHTTP.success(req, res, books, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500)
        }
    }
};

module.exports = controller;
