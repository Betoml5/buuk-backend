const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { config } = require("./config");
const cors = require("cors");
const bookRouter = require("./routes/Book");
const newsRouter = require("./routes/News");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

mongoose
    .connect(
        `mongodb+srv://${USER}:${PASSWORD}${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log(`Conectado a la [DB]`);
    })
    .catch((e) => console.log("Error", e));

app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);

app.use(`/api/${config.version}/books`, bookRouter);
app.use(`/api/${config.version}/news`, newsRouter);
module.exports = app;
