# 🚀 Task Manager (Full Stack Application)

A full-stack Task Manager application where users can signup, login, create tasks, and track their progress using a dashboard.

---

## 📌 Features

- 🔐 User Authentication (Signup & Login using JWT)
- 📝 Task Creation
- 📊 Dashboard (Total / Pending / Completed tasks)
- 👤 Role-based user system (Admin / Member)
- ☁️ MongoDB Atlas (Cloud Database)
- 🚀 Backend deployed on Railway
- 🎨 Responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- HTML
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Deployment
- Railway

---

## 📁 Project Structure


task-manager/
│
├── server.js # Backend (API)
├── package.json # Dependencies
├── index.html # Frontend UI
└── README.md # Documentation


---

## ⚙️ Setup Instructions (STEP-BY-STEP)

Follow these steps to run the project locally 👇

---

### 🟢 Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
🟢 Step 2: Install Dependencies
npm install
🟢 Step 3: Setup Environment Variables

Create a .env file in root folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

👉 Example MongoDB URI:

mongodb+srv://username:password@cluster0.mongodb.net/taskmanager
🟢 Step 4: Run Backend Server
node server.js

👉 You should see:

✅ MongoDB Connected
✅ Server running on port 5000
🟢 Step 5: Run Frontend

Open the file:

index.html

👉 Just double-click it OR open in browser.

🌐 Live Deployment

👉 Backend URL:

https://task-manager-production-0850.up.railway.app
🔗 API Endpoints
🔐 Authentication
➤ Signup
POST /signup

Body:

{
  "email": "test@gmail.com",
  "password": "123456"
}
➤ Login
POST /login

Response:

{
  "token": "your_jwt_token"
}
📝 Tasks (Protected Routes)

⚠️ Add this header:

Authorization: Bearer your_token
➤ Create Task
POST /tasks

Body:

{
  "title": "My Task"
}
➤ Get Tasks
GET /tasks
🧠 How It Works
User signs up → stored in MongoDB
User logs in → JWT token generated
Token is sent in headers
Backend verifies token
Tasks are stored and retrieved per user
🔄 System Flow
Frontend (index.html)
        ↓
Backend (Node.js / Railway)
        ↓
Database (MongoDB Atlas)
📊 Dashboard Features
Total Tasks
Pending Tasks
Completed Tasks
⚠️ Important Notes
Enable MongoDB Atlas IP access: 0.0.0.0/0
Do NOT upload .env file to GitHub
Ensure correct MongoDB credentials
🎯 Future Improvements
Project & Team Management
Task Assignment (multi-user)
Due Dates & Overdue tracking
UI Enhancements
👩‍💻 Author

Anusha

📌 Conclusion

This project demonstrates:

Full-stack development
Authentication using JWT
REST API design
MongoDB integration
Cloud deployment using Railway

---

## 📁 Project Structure


## Live URL
https://task-manager-production-0850.up.railway.app
<img width="1902" height="947" alt="image" src="https://github.com/user-attachments/assets/46603687-0740-411f-89cc-9defdc0a566b" />

<img width="1901" height="1006" alt="image" src="https://github.com/user-attachments/assets/0f0dcf58-dddd-4ce0-ab14-22160bf632bc" />

Demo Video
https://www.loom.com/share/d53ec77810bf405d9c425d027eb98307
