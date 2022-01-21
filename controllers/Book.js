const { config } = require("../config");
const axios = require("axios");
const responseHTTP = require("../network/response");
const boom = require("@hapi/boom");

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
            }, 1000);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    searchBook: async (req, res) => {
        const { title } = req.query;
        try {
            const response = await axios.get(
                `${config.googleApi}/volumes?q=${title}&langRestrict=es`
            );

            console.log(response.data.totalItems);

            if (response.data.totalItems === 0) {
                return responseHTTP.error(
                    req,
                    res,
                    { message: "No items found", totalItems: 0 },
                    500
                );
            }

            const books = response.data.items.map((book) => ({
                id: book.id,
                selfLink: book.selfLink,
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                publishedDate: book.volumeInfo.publishedDate,
                pageCount: book.volumeInfo.pageCount,
                avgRating: book.volumeInfo.averageRating,
                authors: book.volumeInfo.authors,
                images: book.volumeInfo.imageLinks,
                lang: book.volumeInfo.language,
                categories:
                    book.volumeInfo.categories &&
                    book?.volumeInfo?.categories[0],
                cover: `https://covers.openlibrary.org/b/isbn/${book.volumeInfo?.industryIdentifiers[0].identifier}-L.jpg`,
            }));
            return responseHTTP.success(req, res, books, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
    searchBooksBySubject: async (req, res) => {
        const { q } = req.query;
        try {
            const response = await axios.get(
                `${config.googleApi}/volumes?q=subject:${q}&langRestrict=es&orderBy=newest`
            );
            if (response.data.totalItems === 0) {
                return responseHTTP.error(req, res, {
                    message: "No results",
                    totalItems: 0,
                });
            }

            const books = response.data.items.map((book) => ({
                id: book.id,
                selfLink: book.selfLink,
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                publishedDate: book.volumeInfo.publishedDate,
                pageCount: book.volumeInfo.pageCount,
                avgRating: book.volumeInfo.averageRating,
                authors: book.volumeInfo.authors,
                images: book.volumeInfo.imageLinks,
                lang: book.volumeInfo.language,
                cover: `https://covers.openlibrary.org/b/isbn/${book.volumeInfo?.industryIdentifiers[0].identifier}-L.jpg`,
            }));

            return responseHTTP.success(req, res, books, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    },
};

module.exports = controller;
