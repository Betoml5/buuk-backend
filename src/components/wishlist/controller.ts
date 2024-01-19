import { Request, Response } from "express";
import store from "./store";
import response from "../../network/response";

class Controller {
    static async create(req: Request, res: Response) {
        try {
            const { bookISBN } = req.body;
            const updatedWishlist = await store.insert({
                bookISBN,
                userId: 4,
            });
            return response.success(req, res, updatedWishlist, 201);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
    static async getById(req: Request, res: Response) {
        try {
            const wishlist = await store.getById({ userId: 4 });
            return response.success(req, res, wishlist, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
}

export default Controller;
