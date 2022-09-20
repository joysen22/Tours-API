const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Configs/DB");
require("dotenv").config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// mongodb connect
ConnectDB();
// text server get route
app.get("/", (req, res, next) => {
  res.status(200).send("server is running");
});
// Tours Route
app.use("/api/v1", require("./Routers/v1/ToursRoute"));
module.exports = app;
