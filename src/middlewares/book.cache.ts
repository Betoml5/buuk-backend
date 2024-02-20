import { NextFunction, Request, Response } from "express";
import Cache from "node-cache";

export const bookCache = new Cache({
    stdTTL: 100,
    checkperiod: 120,
});

export const bookCacheMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const book = bookCache.get(id);
    if (book) {
        res.send(book);
    } else {
        next();
    }
};
