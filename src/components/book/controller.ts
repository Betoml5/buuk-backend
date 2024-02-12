import responseHTTP from "../../network/response";

import BookService from "../../services/book";
import { Request, Response } from "express";
import NodeCache from "node-cache";
const bookCache = new NodeCache({ stdTTL: 1000, checkperiod: 120 });

class Controller {
    static async getBookByQuery(req: Request, res: Response) {
        const { q, maxResults, startIndex } = req.query as any;
        try {
            if (!q) throw new Error("Query is required");

            if (bookCache.has(q)) {
                const response = bookCache.get(q);
                return responseHTTP.success(req, res, response, 200);
            }

            const response = await BookService.getByQuery({
                query: q,
                maxResults,
                startIndex,
            });

            bookCache.set(q, response);

            return responseHTTP.success(req, res, response, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async getBookBySubject(req: Request, res: Response) {
        const { subject, maxResults, startIndex } = req.query as any;

        try {
            if (!subject) throw new Error("Subject is required");

            if (bookCache.has(subject)) {
                const response = bookCache.get(subject);
                return responseHTTP.success(req, res, response, 200);
            }

            const response = await BookService.getBySubject({
                subject,
                maxResults,
                startIndex,
            });

            bookCache.set(subject, response);

            return responseHTTP.success(req, res, response, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }

    static async getBookById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            if (!id) throw new Error("id is required");

            if (bookCache.has(id)) {
                const response = bookCache.get(id);
                return responseHTTP.success(req, res, response, 200);
            }

            const response = await BookService.getById({ id });

            bookCache.set(id, response);
            return responseHTTP.success(req, res, response, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
}

export default Controller;
