const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { config } = require("./config");
const cors = require("cors");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

mongoose
  .connect(
    `mongodb+srv://${USER}:${PASSWORD}${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`Conectado satisfactoriamente en el puerto: ${config.port}`);
  })
  .catch((e) => console.log("Error", e));

app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;
