import { Request, Response } from "express";
import store from "./store";
import response from "../../network/response";

class Controller {
    static async create(req: Request, res: Response) {
        try {
            const { bookISBN } = req.body;
            const updatedLibrary = await store.insert({
                bookISBN,
                userId: 6,
            });
            return response.success(req, res, updatedLibrary, 201);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
    static async getById(req: Request, res: Response) {
        try {
            const wishlist = await store.getById({ userId: 6 });
            return response.success(req, res, wishlist, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
}

export default Controller;
