const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Task = require("./models/task");

const app = express();

mongoose
  .connect(
    "mongodb+srv://max:UbRvBIMClZfHQsmL@cluster0-pnyix.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.post("/api/tasks", (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    deadlineDate: req.body.deadlineDate,
    taskSetDate: req.body.taskSetDate,
    category: req.body.category,
    status: req.body.status
  });
  task.save().then(createdTask => {
    res.status(201).json({
      message: "Task added successfully",
      postId: createdTask._id
    });
  });
});

app.get("/api/tasks", (req, res, next) => {
  Task.find().then(documents => {
    res.status(200).json({
      message: "Tasks fetched successfully!",
      tasks: documents
    });
  });
});

app.get("/api/tasks/:id", (req, res, next) => {
  Task.findById(req.params.id).then(document => {
    res.status(200).json({
      message: "Task found and fetched successfully!",
      task: document
    });
  });
});

app.delete("/api/tasks/:id", (req, res, next) => {
  Task.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Task deleted!" });
  });
});

app.put("/api/tasks/:id",(req,res,next)=>{
  Task.findByIdAndUpdate(req.params.id,{
    $set:req.body
  })
  .then(result => {
    console.log(result);
    res.status(200).json({ message: "Task status updated!" });
  });
})


module.exports = app;
