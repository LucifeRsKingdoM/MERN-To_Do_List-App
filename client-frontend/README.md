# MERN-To\_Do\_List-App ✅

## 🚀 Introduction

Welcome to **MERN-To\_Do\_List-App**, a full-stack **Task Management Application** built with the **MERN stack** but using **MySQL** instead of MongoDB! This app helps users efficiently organize tasks, set priorities, track deadlines, and never miss important work! 🎯

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






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
