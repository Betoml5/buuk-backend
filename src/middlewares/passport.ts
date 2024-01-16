import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

import prisma from "../database/connection";
import config from "../config";

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email: string, password: string, done: any) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { email },
                });
                if (!user)
                    return done(null, false, { message: "User not found" });
                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!isPasswordValid)
                    return done(null, false, {
                        message: "Invalid credentials",
                    });
                return done(null, user, { message: "Logged in successfully" });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                return done(null, token);
            } catch (error) {
                done(error);
            }
        }
    )
);
