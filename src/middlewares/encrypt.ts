import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

const encrypt = async (req: Request, _res: Response, next: NextFunction) => {
    const { user } = req.body;
    if (user) {
        req.body.user.password = await bcrypt.hash(user.password, 10);
    }
    next();
};

export default encrypt;
