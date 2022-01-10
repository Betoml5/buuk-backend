const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const User = new Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, minlength: 8 },
    image: { type: String, required: false, default: "" },
    whishlist: { type: [] },
    readedbooks: { type: [] },
    library: { type: [] },
    timeline: { type: [] },
    pagescount: { type: Number, default: 0 },
    hoursreaded: { type: Number, default: 0 },
    wordscount: { type: Number, default: 0 },
});

//Aqui lo que hacemos es que antes de que se guarde el usuario, vamos a encriptar la constraseña
// OJO SI USAMOS ARROW FUNCTIONS, VAMOS A TENER PROBLEMAS CON THIS.
User.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

User.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
};

User.static("findOneOrCreate", async function findOneOrCreate(condition, doc) {
    const one = await this.findOne(condition);

    return one || this.create(doc);
});

module.exports = model("User", User);
