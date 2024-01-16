import passport from "passport";
import { Request, Response, NextFunction } from "express";
import responseHTTP from "../../network/response";
import { TToken } from "../../types";

import jwt from "jsonwebtoken";

import config from "../../config";
import { Prisma } from "@prisma/client";

class Controller {
    static async login(req: Request, res: Response, next: NextFunction) {
        passport.authenticate(
            "login",
            async (err: any, user: Prisma.UserWhereUniqueInput, info: any) => {
                try {
                    if (err || !user)
                        return responseHTTP.error(req, res, info, 401);
                    delete user.password;
                    req.login(user, { session: false }, async (err) => {
                        if (err) next(err);

                        const token = jwt.sign(
                            { id: user.id },
                            config.authJwtSecret,
                            {
                                expiresIn: "1d",
                            }
                        );
                        const refreshToken = jwt.sign(
                            { id: user.id },
                            config.authJwtRefreshSecret,
                            {
                                expiresIn: "7d",
                            }
                        );
                        res.cookie("refreshToken", refreshToken, {
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                            sameSite: "none",
                            secure: true,
                            httpOnly: true,
                            path: "/",
                        });

                        return responseHTTP.success(
                            req,
                            res,
                            { token, user, refreshToken },
                            200
                        );
                    });
                } catch (e: any) {
                    return responseHTTP.error(req, res, e, 500);
                }
            }
        )(req, res, next);
    }
    static async logout(req: Request, res: Response, _next: NextFunction) {
        res.cookie("refreshToken", "", {
            maxAge: 0,
            sameSite: "none",
            secure: true,
            httpOnly: true,
            path: "/",
        });

        return responseHTTP.success(req, res, { message: "Logout" }, 200);
    }
    static async generateRefreshToken(
        req: Request,
        res: Response,
        _next: NextFunction
    ) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
                return responseHTTP.error(req, res, "No token provided", 403);

            jwt.verify(
                refreshToken,
                config.authJwtRefreshSecret,
                (err: any) => {
                    if (err) {
                        res.cookie("refreshToken", "", {
                            maxAge: 0,
                            sameSite: "none",
                            secure: true,
                            httpOnly: true,
                            path: "/",
                        });

                        return responseHTTP.error(
                            req,
                            res,
                            {
                                message: "Unauthorized",
                            },
                            401
                        );
                    }
                }
            );
            const tokenInfo: TToken | string | jwt.JwtPayload | null =
                jwt.decode(refreshToken, { json: true }); // El tercer parámetro { json: true } se utiliza para asegurarse de que el resultado sea un objeto JSON.

            const payload: {
                id: string | undefined;
                type: string | undefined;
            } = {
                id: typeof tokenInfo === "object" ? tokenInfo?.id : undefined,
                type:
                    typeof tokenInfo === "object" ? tokenInfo?.type : undefined,
            };

            const token = jwt.sign(payload, config.authJwtRefreshSecret, {
                expiresIn: 84000,
            });
            return responseHTTP.success(req, res, { token }, 200);
        } catch (e) {
            return responseHTTP.error(req, res, e, 500);
        }
    }
    // static async forgotPassword(req: Request, res: Response) {
    //     //TODO
    // }
    // static async resetPassword(req: Request, res: Response) {
    //     //TODO
    // }
}

export default Controller;
