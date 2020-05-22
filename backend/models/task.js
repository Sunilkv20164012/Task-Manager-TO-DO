const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  deadlineDate: { type: Date, required: true },
  taskSetDate: { type: Date, required: true, default: Date.now },
  category: { type: Number, required: true},
  status: { type: Boolean, required: true }
});

module.exports = mongoose.model("Task", taskSchema);



