import { Request, Response } from "express";
import store from "./store";
import response from "../../network/response";
import R from "ramda";
import { TTimeline } from "../../types";

class Controller {
    static async create(req: Request, res: Response) {
        try {
            const { bookISBN } = req.body;

            const updatedTimeLine = await store.insert({
                bookISBN,
                userId: 1,
            });
            return response.success(req, res, updatedTimeLine, 201);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
    static async getById(req: Request, res: Response) {
        try {
            const timeline = await store.getById({ userId: 1 });

            const groupByDate = R.groupBy((item: TTimeline) => {
                const date = new Date(item.createdAt);
                return date.toISOString().split("T")[0];
            });
            const groupByDateArray = groupByDate(timeline);

            return response.success(req, res, groupByDateArray, 200);
        } catch (error) {
            return response.error(req, res, error, 500);
        }
    }
}

export default Controller;
