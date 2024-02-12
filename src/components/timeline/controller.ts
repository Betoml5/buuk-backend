import R from "ramda";
import store from "./store";
import response from "../../network/response";
import { TUserJwt } from "../../types";
import { Request, Response } from "express";
import BookService from "../../services/book";
import { Settings } from "luxon";

Settings.defaultZone = "America/Mexico_City";

class Controller {
    static async create(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const { bookId, pages } = req.body;

            const updatedTimeLine = await store.insert({
                bookId,
                userId: user.id,
                pages,
            });

            return response.success(req, res, updatedTimeLine, 201);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
    static async getById(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const timeline = await store.getById({ userId: user.id });
            //fetch only once per book id because if the user has read the same book multiple times
            // we should not fetch the same book multiple times
            const booksIds = timeline.map((item) => item.bookId);
            const uniqueBooksIds = R.uniq(booksIds);
            const books = await Promise.all(
                uniqueBooksIds.map((id) => BookService.getById({ id }))
            );

            const timelineWithBooks = timeline.map((item) => {
                const book = books.find((book) => book.id === item.bookId);
                return {
                    ...item,
                    book,
                };
            });
            const groupedByDate = R.groupBy(
                (item) => item.createdAt.toISOString().split("T")[0],
                timelineWithBooks
            );

            const flattened = Object.keys(groupedByDate).map((key) => {
                return {
                    date: key,
                    books: groupedByDate[key],
                };
            });

            // order by date desc

            // with R

            const ordered = R.sort(R.descend(R.prop("date")), flattened);

            return response.success(req, res, ordered, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
}

export default Controller;
