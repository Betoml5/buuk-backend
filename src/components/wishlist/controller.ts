import { Request, Response } from "express";
import store from "./store";
import response from "../../network/response";
import { TUserJwt } from "../../types";

class Controller {
    static async create(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const { bookISBN } = req.body;
            const updatedWishlist = await store.insert({
                bookISBN,
                userId: user.id,
            });
            return response.success(req, res, updatedWishlist, 201);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
    static async getById(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const wishlist = await store.getById({ userId: user.id });
            return response.success(req, res, wishlist, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
}

export default Controller;
