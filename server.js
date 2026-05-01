const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");

const app = express();
app.use(express.json());
app.use(cors());


// ================= DATABASE =================
mongoose.connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));


// ================= TEST =================
app.get("/", (req, res) => {
  res.send("API running");
});


// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Wrong password");

    const token = jwt.sign({ id: user._id }, "secret");

    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ================= PROJECT =================
app.post("/project", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ================= TASK =================
app.post("/task", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ================= GET TASKS =================
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});


// ================= START SERVER =================
app.listen(5000, () => console.log("Server running on port 5000"));