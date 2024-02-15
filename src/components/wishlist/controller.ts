import { Request, Response } from "express";
import store from "./store";
import response from "../../network/response";
import { TUserJwt } from "../../types";
import BookService from "../../services/book";
import R from "ramda";

class Controller {
    static async create(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const { bookId } = req.body;
            const updatedWishlist = await store.insert({
                bookId,
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
            const booksIds = wishlist.map((item) => item.bookId);
            const uniqueBooksIds = R.uniq(booksIds);
            const books = await Promise.all(
                uniqueBooksIds.map((id) => BookService.getById({ id }))
            ).then((books) => books.map((book) => book));

            return response.success(req, res, books, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }

    static async delete(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const { bookId } = req.params;
            const updatedWishlist = await store.delete({
                bookId,
                userId: user.id,
            });
            return response.success(req, res, updatedWishlist, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
}

export default Controller;
