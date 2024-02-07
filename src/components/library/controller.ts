import { Request, Response } from "express";
import response from "../../network/response";
import store from "./store";
import { TUserJwt } from "../../types";
import BookService from "../../services/book";

class Controller {
    static async create(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const { bookId } = req.body;

            if (!bookId) {
                throw new Error("No data provided to create library");
            }

            // Check if the book exists
            const isAlreadyAtLibrary = (
                await store.getById({ userId: user.id })
            ).find((book) => book.bookId === bookId);

            if (isAlreadyAtLibrary)
                return response.error(req, res, "Book already at library", 400);

            const updatedLibrary = await store.insert({
                bookId,
                userId: user.id,
            });

            return response.success(req, res, updatedLibrary, 201);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const user = req.user as TUserJwt;
            const library = await store.getById({ userId: user.id });
            if (!library)
                return response.error(req, res, "Library not found", 404);

            const books = await Promise.all(
                library.map((item) => BookService.getById({ id: item.bookId }))
            );

            return response.success(req, res, books, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
}

export default Controller;
