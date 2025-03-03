# MERN-To\_Do\_List-App ✅

## 🚀 Introduction

Welcome to **MERN-To\_Do\_List-App**, a full-stack **Task Management Application** built with the **MERN stack** but using **MySQL** instead of MongoDB! This app helps users efficiently organize tasks, set priorities, track deadlines, and never miss important work! 🎯


![Screenshot 2025-03-03 200016](https://github.com/user-attachments/assets/a6a1b181-f884-4a14-8ac0-010093f7445b) , ![Screenshot 2025-03-03 200037](https://github.com/user-attachments/assets/0e8cc14d-4b77-4ad9-b915-c9bcf4de1c9c), ![Screenshot 2025-03-03 200156](https://github.com/user-attachments/assets/ce5c229d-2cad-4536-a1f4-4073b6857878), ![Screenshot 2025-03-03 200226](https://github.com/user-attachments/assets/d0981587-273b-43af-9c3f-49de0f5aa0a5), ![Screenshot 2025-03-03 200247](https://github.com/user-attachments/assets/74d87945-a178-4e69-9b85-b80895b36ed8)
---

## 🛠️ Technologies Used

### Frontend (Client) 🎨

- **React.js** ⚛️
- **Material UI (MUI)** 🎨
- **Framer Motion** ✨ (for smooth animations)
- **Axios** 🔄 (for API calls)
- **React Toastify** 🍞 (for notifications)
- **Date-fns** 📅 (for date management)
- **JWT-Decode** 🔐 (for decoding authentication tokens)

### Backend (Server) 🖥️

- **Node.js & Express.js** 🚀
- **MySQL** 🛢️ (as the database instead of MongoDB)
- **Sequelize ORM** 🗄️
- **bcrypt.js** 🔐 (for password hashing)
- **jsonwebtoken (JWT)** 🛡️ (for authentication)
- **CORS & dotenv** 🌐 (for security & environment variables)

### Other Tools 🛠️

- **Concurrently** 🏃‍♂️ (to run frontend & backend in one command)
- **Local Storage** 💾 (for temporary guest users)

---

## 🎯 Features

✅ **User Authentication** (Register & Login with JWT authentication)\
✅ **Guest Mode** (Allows users to create temporary tasks using Local Storage)\
✅ **Task Management** (Create, Read, Update, Delete tasks)\
✅ **Task Prioritization** (Low, Medium, High)\
✅ **Due Dates & Deadlines** (Never miss a task)\
✅ **Drag and Drop** (Reorder tasks easily using `@hello-pangea/dnd`)\
✅ **User Dashboard** (View and manage all tasks)\
✅ **Real-time Notifications** (Success & error messages using Toastify)\
✅ **Fully Responsive UI** (Works on all devices)\
✅ **Smooth Animations** (Enhancing user experience)

---

## 🚀 How It Works

### 🔐 Authentication Flow

1. Users can **register** using their email and password.
2. Upon login, they receive a **JWT token** for authentication.
3. The token is stored in **local storage** for session management.

### 📋 Task Management Flow

1. Users can **add new tasks** with descriptions, due dates, and priorities.
2. Tasks are stored in the **MySQL database** using Sequelize ORM.
3. Users can **update, delete, or reorder** tasks.
4. Tasks are fetched dynamically and displayed beautifully.

### 🏃 Guest Mode Flow

1. Users can use the app **without registering**.
2. Tasks are stored in **local storage** instead of the database.
3. If a guest registers, their tasks **won't be saved** permanently.

---

## 🏁 Getting Started

### 📦 Installation

Make sure you have **Node.js** and **MySQL** installed.

1️⃣ Clone the repository:

```bash
 git clone https://github.com/LucifeRsKingdoM/MERN-To_Do_List-App.git
```

2️⃣ Navigate to the project folder:

```bash
 cd MERN-To_Do_List-App
```

3️⃣ Install dependencies for **frontend** and **backend**:

```bash
 cd client-frontend && npm install
 cd ../server-backend && npm install
```

### 🚀 Running the Application

#### Run Frontend & Backend Together (Recommended) 🏃‍♂️💨

Since we have **concurrently** installed, we can run both frontend & backend with a single command:

```bash
 npm run dev
```

#### Run Frontend & Backend Separately (Optional) 🎭

1️⃣ Start the **backend**:

```bash
 cd server-backend
 npm start
 or
 cd server-backend
 node server.js
```

2️⃣ Start the **frontend**:

```bash
 cd client-frontend
 npm start
```

### 🛠️ Environment Variables

Create a **.env** file inside `server-backend` and configure your MySQL database:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=mern_todo_db
JWT_SECRET=your_jwt_secret_key
```

---

## 🛠️ API Endpoints

### 🔐 Authentication Routes

- **POST** `/api/auth/register` → Register new users
- **POST** `/api/auth/login` → Login and receive JWT token

### 📋 Task Routes

- **GET** `/api/tasks` → Get all tasks for logged-in user
- **POST** `/api/tasks` → Create a new task
- **PUT** `/api/tasks/:id` → Update a task
- **DELETE** `/api/tasks/:id` → Delete a task

---

## 🤝 Contributing

If you want to contribute, feel free to **fork the repo**, create a new **branch**, and submit a **pull request**! 🎉

---

## 📜 License

This project is licensed under the **MIT License** 📜.

---

## 🚀 Connect with Me

👨‍💻Portfolio: [https://luciferskingdom.github.io/Portfolio/](https://luciferskingdom.github.io/Portfolio/)

🔗 LinkedIn: [https://www.linkedin.com/in/yogesh490807/](https://www.linkedin.com/in/yogesh490807/)\
📧 Email: [personalmail.lucifer@example.com](mailto\:personalmail.lucifer@example.com)

---

**Made with ❤️ by LucifeR**🎨🚀

