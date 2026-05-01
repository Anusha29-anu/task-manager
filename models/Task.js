const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  project: String,
  assignedTo: String,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Task", taskSchema);