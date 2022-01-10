const { config } = require("../config");

const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

// const transformFacebookProfile = (profile) => ({
//     name: profile.name,
//     avatar: profile.picture.data.url,
// });

passport.use(
    "login",
    new localStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user)
                    return done(null, false, { message: "User not found" });

                const validate = await bcrypt.compare(password, user.password);
                if (!validate)
                    return done(null, false, { message: "Wrong password" });

                return done(null, user, { message: "Login sucessfully" });
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Con este middleware, vamos a verificar el token en cada peticion.
// Tenemos que ponerlo en cada ruta, para valdiar
passport.use(
    new JWTStrategy(
        {
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        (token, done) => {
            try {
                if (!token) {
                    return done(null, "Token required");
                }
                console.log("VALIDANDO TOKEN...");
                return done(null, token);
            } catch (e) {
                done(e);
            }
        }
    )
);

//Esto es para que funcione la estrategia de Facebook
// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });
