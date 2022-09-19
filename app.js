const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Configs/DB");
require("dotenv").config();
const app = express();
const DB_URL = process.env.DB_URL;
// Middleware
app.use(cors());
app.use(express.json());
// mongodb connect
ConnectDB(DB_URL);
// text server get route
app.get("/", (req, res, next) => {
  res.status(200).send("server is running");
});
// Tours Route

module.exports = app;
