import { Request, Response } from "express";
import response from "../../network/response";
import store from "./store";
import { TUserJwt } from "../../types";

class Controller {
    static async create(req: Request, res: Response) {
        const user = req.user as TUserJwt;
        try {
            const { bookISBN } = req.body;

            if (!bookISBN) {
                throw new Error("No data provided to create library");
            }

            const updatedLibrary = await store.insert({
                bookISBN,
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
            return response.success(req, res, library, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
}

export default Controller;
