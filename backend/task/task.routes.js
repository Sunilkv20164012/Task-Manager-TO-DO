const express = require("express");

const Task = require("./task");
const checkAuth = require("../user/check-auth.middleware");

const router = express.Router();


router.post(
  "",
  checkAuth,
  (req, res, next) => {
    const task = new Task({
      title: req.body.title,
      deadlineDate: req.body.deadlineDate,
      startDate: req.body.startDate,
      category: req.body.category,
      status: req.body.status,
      creator: req.userData.userId
    });
    console.log(task+"from backend");
    task
      .save()
      .then(createdTask => {
        res.status(201).json({
          message: "Task added successfully",
          postId: {
            ...createdTask,
            id: createdTask._id
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating a Task failed!"
        });
      });
  }
);


router.put(
  "/:id",
  checkAuth,
  (req, res, next) => {
    console.log(req.params.id + " ::::: " +  req.body.status);
    const task = new Task({
      _id: req.body.id,
      title: req.body.title,
      deadlineDate: req.body.deadlineDate,
      startDate: req.body.startDate,
      category: req.body.category,
      status: req.body.status,
      creator: req.userData.userId
    });
    Task.updateOne({ _id: req.params.id, creator: req.userData.userId }, task)
      .then(result => {
        if (result.nModified > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate Task!"
        });
      });
  }
);

router.get(
  "",
  checkAuth,
  (req, res, next) => {



  Task.find({creator: req.userData.userId})
    .then(documents => {
      res.status(200).json({
        message: "Tasks fetched successfully!",
        tasks: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Task failed!"
      });
    });
});

router.get("/:id", (req, res, next) => {

  Task.findById(req.params.id)
    .then(task => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });

});


router.delete("/:id", checkAuth, (req, res, next) => {

  Task.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Deleting Task failed!"
    });
  });
});

module.exports = router;
