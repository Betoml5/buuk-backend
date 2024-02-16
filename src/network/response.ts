import { Request, Response } from "express";

export const statusMessages = {
    200: "Done",
    201: "Created",
    400: "Invalid format",
    500: "Internal error",
};

const success = (_req: Request, res: Response, message: any, status: any) => {
    let statusCode = status; // 200
    let statusMessage = message; // Todo bien

    if (!status) status = 200;

    if (!message)
        statusMessage = statusMessages[status as keyof typeof statusMessages];

    res.status(statusCode).send({
        error: "",
        body: statusMessage,
    });
};

const error = (_req: Request, res: Response, message: any, status: any) => {
    res.status(status || 500).send({
        error: message,
        body: "",
    });
};

export default {
    success,
    error,
};
