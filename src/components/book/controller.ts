import axios from "axios";
import responseHTTP from "../../network/response";
import config from "../../config";
import BookService from "../../services/book";
import { Request, Response } from "express";

class Controller {
    static async bestSellers(req: Request, res: Response) {
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
    }
    static async searchBook(req: Request, res: Response) {
        const { title } = req.query;
        try {
            const response = await BookService.getByName({
                name: title as string,
            });

            // const books = response.data.items.map((book: any) => ({
            //     id: book.id,
            //     selfLink: book.selfLink,
            //     title: book.volumeInfo.title,
            //     description: book.volumeInfo.description,
            //     publishedDate: book.volumeInfo.publishedDate,
            //     pageCount: book.volumeInfo.pageCount,
            //     avgRating: book.volumeInfo.averageRating,
            //     authors: book.volumeInfo.authors,
            //     images: book.volumeInfo.imageLinks,
            //     lang: book.volumeInfo.language,
            //     categories:
            //         book.volumeInfo.categories &&
            //         book?.volumeInfo?.categories[0],
            //     cover:
            //         book.volumeInfo?.industryIdentifiers?.length > 0 &&
            //         `https://covers.openlibrary.org/b/isbn/${book.volumeInfo?.industryIdentifiers[0].identifier}-L.jpg`,
            // }));

            return responseHTTP.success(req, res, response, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async searchBooksBySubject(req: Request, res: Response) {
        const { q } = req.query;
        try {
            const response = await BookService.getBySubject({
                subject: q as string,
            });

            // const books = response.data.items.map((book: any) => ({
            //     id: book.id,
            //     selfLink: book.selfLink,
            //     title: book.volumeInfo.title,
            //     description: book.volumeInfo.description,
            //     publishedDate: book.volumeInfo.publishedDate,
            //     pageCount: book.volumeInfo.pageCount,
            //     avgRating: book.volumeInfo.averageRating,
            //     authors: book.volumeInfo.authors,
            //     images: book.volumeInfo.imageLinks,
            //     lang: book.volumeInfo.language,
            //     cover: `https://covers.openlibrary.org/b/isbn/${book.volumeInfo?.industryIdentifiers[0].identifier}-L.jpg`,
            // }));

            return responseHTTP.success(req, res, response, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
}

export default Controller;
