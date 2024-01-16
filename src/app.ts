import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";

import userRouter from "./components/user/router";
import authRouter from "./components/auth/router";
import bookRouter from "./components/book/router";
import libraryRouter from "./components/library/router";
import "./middlewares/passport";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
    })
);
app.disable("x-powered-by");
app.use(passport.initialize());

const paths = [
    {
        path: "/api/v1/auth",
        router: authRouter,
    },
    {
        path: "/api/v1/user",
        router: userRouter,
    },
    {
        path: "/api/v1/book",
        router: bookRouter,
    },
    {
        path: "/api/v1/library",
        router: libraryRouter,
    },
];

paths.forEach((path) => {
    app.use(path.path, path.router);
});

export default app;
