import { Request, Response } from "express";

import responseHTTP from "../../network/response";
// import axios from "axios";
// import config from "../../config";
import store from "./store";
// import BookService from "../../services/book";

class Controller {
    static async create(req: Request, res: Response) {
        const { user } = req.body;

        try {
            if (!user) {
                throw new Error("No data provided to create user");
            }

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

    // static async addToLibrary(req: Request, res: Response) {
    //     const { bookId } = req.query;
    //     const userId = req.user.id;

    //     try {
    //         const response = await axios.get(
    //             `${config.googleApi}/volumes/${bookId}`
    //         );
    //         const item = response.data;

    //         const book = {
    //             id: item.id,
    //             selfLink: item.selfLink,
    //             title: item.volumeInfo.title,
    //             description: item.volumeInfo.description,
    //             publishedDate: item.volumeInfo.publishedDate,
    //             pageCount: item.volumeInfo.pageCount,
    //             avgRating: item.volumeInfo.averageRating,
    //             authors: item.volumeInfo.authors,
    //             images: item.volumeInfo.imageLinks,
    //             lang: item.volumeInfo.language,
    //             categories:
    //                 item.volumeInfo.categories &&
    //                 item?.volumeInfo?.categories[0],
    //             cover: `https://covers.openlibrary.org/b/isbn/${item.volumeInfo?.industryIdentifiers[0].identifier}-L.jpg`,
    //         };

    //         const user = await User.findById(req.user.id);
    //         user.library.push(book);
    //         user.save({ new: true });
    //         return responseHTTP.success(req, res, user, 200);
    //     } catch (error) {
    //         return responseHTTP.error(req, res, error, 500);
    //     }
    // }
    // static async removeFromLibrary(req: Request, res: Response) {
    //     const { bookId } = req.query;
    //     try {
    //         const user = await User.findById(req.user.id);

    //         const bookIndex = user.library.findIndex(
    //             (item) => item.id === bookId
    //         );
    //         user.library.splice(bookIndex, 1);
    //         user.save({ new: true });
    //         return responseHTTP.success(req, res, user, 200);
    //     } catch (error) {
    //         return responseHTTP.error(req, res, error, 500);
    //     }
    // }
    // static async addTimelineItem(req: Request, res: Response) {
    //     const { item } = req.body;

    //     try {
    //         const options = {
    //             weekday: "long",
    //             year: "numeric",
    //             month: "long",
    //             day: "numeric",
    //         };
    //         const user = await User.findById(req.user.id);
    //         const date = new Date().getDate();
    //         const fullDate = new Date().toLocaleDateString("es-MX", options);
    //         item.fulldate = fullDate;
    //         item.date = date;
    //         user.pagescount = user.pagescount + item.book.numberPages;

    //         for (let i = 0; i < user.timeline.length; i++) {
    //             if (user.timeline[i].date === date) {
    //                 user.timeline[i].items.push(item);
    //                 // user.timeline[index].push(item) no funcionaba por esto
    //                 // Esto arregla el error de la fecha
    //                 user.markModified("timeline");
    //                 user.save();
    //                 return responseHTTP.success(req, res, user, 200);
    //             }
    //         }
    //         user.timeline.push({
    //             items: [item],
    //             date,
    //             fullDate,
    //         });
    //         user.save();
    //         return responseHTTP.success(req, res, user, 200);
    //     } catch (error) {
    //         return responseHTTP.error(res, res, error, 500);
    //     }
    // }
    // static async removeTimelineItem(req: Request, res: Response) {
    //     const { indexOf } = req.params;
    //     const { itemId } = req.query;
    //     try {
    //         const user = await User.findById(id);
    //         const itemIndex = user.timeline.indexOf(itemId);
    //         user.timeline.splice(itemIndex, 1);
    //         user.save();
    //         return responseHTTP.success(req, res, user, 200);
    //     } catch (error) {
    //         return responseHTTP.error(req, res, error, 500);
    //     }
    // }
}

export default Controller;
