const passport = require("passport");
const boom = require("@hapi/boom");

const middlewares = {
    verifyAuth: (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (err, user, info) => {
            //si hubo un error relacionado con la validez del token (error en su firma, caducado, etc)
            if (info) {
                return next(boom.unauthorized(info));
            }
            //si hubo un error en la consulta a la base de datos
            if (err) {
                return next(boom.badGateway(err));
            }
            //si el token está firmado correctamente pero no pertenece a un usuario existente
            if (!user) {
                return next(boom.unauthorized());
            }
            //inyectamos los datos de usuario en la request
            req.user = user;
            next();
        })(req, res, next);
    },
};

module.exports = middlewares;
