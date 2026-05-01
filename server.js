const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection (Improved with options)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => {
  console.error("❌ DB Error:", err);
  process.exit(1); // Stop app if DB fails
});

// Sample Route
app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running...");
});

// Task Model
const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model("Task", taskSchema);

// Create Task
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Port (IMPORTANT for Railway)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});