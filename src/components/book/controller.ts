import responseHTTP from "../../network/response";

import BookService from "../../services/book";
import { Request, Response } from "express";

class Controller {
    static async getBookByQuery(req: Request, res: Response) {
        const { q, maxResults, startIndex } = req.query as any;
        try {
            const response = await BookService.getByQuery({
                query: q,
                maxResults,
                startIndex,
            });
            return responseHTTP.success(req, res, response, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async getBookBySubject(req: Request, res: Response) {
        const { subject, maxResults, startIndex } = req.query as any;
        try {
            const response = await BookService.getBySubject({
                subject,
                maxResults,
                startIndex,
            });
            return responseHTTP.success(req, res, response, 200);
        } catch (error) {
            console.log(error);
            return responseHTTP.error(req, res, error, 500);
        }
    }

    static async getBookById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const response = await BookService.getById({ id });
            return responseHTTP.success(req, res, response, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
}

export default Controller;
