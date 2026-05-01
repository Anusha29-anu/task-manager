const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

/* =========================
   MongoDB Connection
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  });

/* =========================
   Models
========================= */

// User Model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member"
  }
});
const User = mongoose.model("User", userSchema);

// Task Model
const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  user: mongoose.Schema.Types.ObjectId
});
const Task = mongoose.model("Task", taskSchema);

/* =========================
   Auth Middleware (FIXED)
========================= */
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    // 🔥 IMPORTANT FIX
    const token = header.split(" ")[1]; // removes "Bearer"

    const decoded = jwt.verify(token, "SECRETKEY");

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

/* =========================
   Routes
========================= */

// Home
app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running...");
});

/* ---------- AUTH ---------- */

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({ message: "User created" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRETKEY"
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- TASKS ---------- */

// Create Task (Protected)
app.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      user: req.user.id
    });

    const savedTask = await task.save();
    res.json(savedTask);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Tasks (Protected)
app.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   Server Start
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});