import { NextFunction, Request, Response } from "express";
import responseHTTP from "../network/response";
import passport from "passport";
import { TUserJwt } from "../types";

export const middlewares = {
    isAuthenticated: (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate(
            "jwt",
            { session: false },
            (e: any, user: TUserJwt, info: any) => {
                if (info)
                    return responseHTTP.error(req, res, info.message, 401);
                if (e) return responseHTTP.error(req, res, e.message, 500);
                if (!user)
                    return responseHTTP.error(req, res, "Unauthorized", 401);
                req.user = user;
                next();
            }
        )(req, res, next);
    },
};
