import { Request, Response } from "express";
import response from "../../network/response";
import store from "./store";

class Controller {
    static async create(req: Request, res: Response) {
        try {
            const { bookISBN } = req.body;

            if (!bookISBN) {
                throw new Error("No data provided to create library");
            }

            const updatedLibrary = await store.insert({
                bookISBN,
                userId: 4,
            });

            return response.success(req, res, updatedLibrary, 201);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            // const { user } = req as any;
            const library = await store.getById({ userId: 4 });
            if (!library)
                return response.error(req, res, "Library not found", 404);
            return response.success(req, res, library, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
}

export default Controller;
