const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const tasksRoutes = require("./task/task.routes");
const userRoutes = require("./user/user.routes");

const app = express();

console.log("mongodb+srv://max:" + process.env.MONGO_ATLAS_PWD + "@cluster0-pnyix.mongodb.net/test?retryWrites=true&w=majority");


mongoose
  .connect(
    "mongodb+srv://max:" + process.env.MONGO_ATLAS_PWD + "@cluster0-pnyix.mongodb.net/test?retryWrites=true&w=majority"
   )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// UbRvBIMClZfHQsmL

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/tasks", tasksRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
