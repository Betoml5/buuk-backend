import { Request, Response } from "express";
import { UserSchema } from "../../validations";
import responseHTTP from "../../network/response";
// import axios from "axios";
// import config from "../../config";
import store from "./store";
import { TUserJwt } from "../../types";
import BookService from "../../services/book";
import timelineStore from "../timeline/store";
import libraryStore from "../library/store";
// import BookService from "../../services/book";

class Controller {
    static async create(req: Request, res: Response) {
        const { user } = req.body;
        const { error } = UserSchema.validate(user);
        if (error) return responseHTTP.error(req, res, error.message, 400);

        try {
            const newUser = await store.insert({
                user,
            });
            return responseHTTP.success(req, res, newUser, 201);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await store.getById({ id: Number(id) });
            if (!user)
                return responseHTTP.error(req, res, "User not found", 404);
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async update(req: Request, res: Response) {
        const { user } = req.body;
        const { id } = req.params;
        try {
            if (!user) {
                throw new Error("No data provided to update user");
            }
            const userUpdated = await store.update({
                id: Number(id),
                user,
            });
            return responseHTTP.success(req, res, userUpdated, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async deleteOne(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await store.deleteOne({
                id: Number(id),
            });
            return responseHTTP.success(req, res, user, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async get(req: Request, res: Response) {
        try {
            const users = await store.get();
            return responseHTTP.success(req, res, users, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async me(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const me = await store.getById({
                id: user.id,
                excludePassword: true,
            });
            return responseHTTP.success(req, res, me, 200);
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async getRecommendations(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const userFound = await store.getById({ id: user.id });
            const library = userFound?.library;

            if (!library) {
                const randomBooks = await BookService.getRandomBooks();

                return responseHTTP.success(req, res, randomBooks, 200);
            }
            const fetchedBooks = await Promise.all(
                library.map((book) => BookService.getById({ id: book.bookId }))
            );

            const categories = fetchedBooks.map(
                (item) => item.volumeInfo.categories
            );
            const categoriesArray = Array.from(new Set(categories.flat()));

            //remove similar categories

            const categoriesArrayFiltered = categoriesArray.filter(
                (category) => {
                    const firstWord = category.split(" ")[0];
                    return !categoriesArray.some(
                        (categoryStr) =>
                            categoryStr.includes(firstWord) &&
                            categoryStr !== category
                    );
                }
            );

            const booksFiltered = await Promise.all(
                categoriesArrayFiltered.map((category) =>
                    BookService.getBySubject({
                        subject: category,
                        maxResults: 1,
                        startIndex: 0,
                    })
                )
            );

            const resultsWithoutEmptyItems = booksFiltered
                .filter((item: any) => item.totalItems > 0)
                .map((item: any) => item.items[0]);

            return responseHTTP.success(
                req,
                res,
                resultsWithoutEmptyItems,
                200
            );
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
    static async getLibraryData(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const timeline = await timelineStore.getById({ userId: user.id });
            const pages = timeline.reduce((acc, item) => acc + item.pages, 0);
            const books = (await libraryStore.getById({ userId: user.id }))
                .length;

            return responseHTTP.success(
                req,
                res,
                {
                    books,
                    pages,
                },
                200
            );
        } catch (error) {
            return responseHTTP.error(req, res, error, 500);
        }
    }
}

export default Controller;
