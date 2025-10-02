# 📝 NoteApp (MERN)

A full-stack **Notes App** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
Users can register, login, and create secure notes. Includes authentication with JWT, password hashing, and theme switching (light/dark mode).

---

## 🚀 Features
- 🔐 User Authentication (Register/Login with JWT)
- 🔒 Password hashing using **bcrypt**
- 🗂️ Create, Read, Update, Delete (CRUD) notes
- 🎨 Beautiful UI with **Tailwind CSS**
- 🌙 Light/Dark Theme Switcher
- ⚡ Toast Notifications with **react-toastify**
- 📱 Responsive Design
- 🌍 Deployment:  
  - **Frontend** → Netlify  
  - **Backend** → Render  
  - **Database** → MongoDB Atlas  

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MongoDB (Atlas)
- **Deployment:** Netlify (Frontend), Render (Backend)

---

## ⚙️ Installation (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/Omhari66/NoteApp.git
cd NoteApp

### 2. Install dependencies
**Frontend:**
cd frontend
npm install

**Backend:**
cd ../server
npm install


### 3. Create .env files
**Backend (`/server/.env`):**
PORT=5000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_jwt_secret


**Frontend (`/frontend/.env`):**
VITE_API_URL=http://localhost:5000/api


### 4. Run the project
**Backend:**
cd server
npm start


**Frontend:**
cd frontend
npm run dev


Visit → http://localhost:5173

---

## 🌍 Deployment

### 1. Backend (Render)
- Push your code to GitHub.
- Go to [Render](https://render.com/).
- Create a new Web Service, connect your repo.
- Root directory → `server/`
- Build Command → `npm install`
- Start Command → `node index.js`
- Add Environment Variables:

MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_jwt_secret
PORT=10000

- Deploy 🎉  
👉 After deploy, you will get a link like:  
[https://noteapp-backend.onrender.com](https://noteapp-backend.onrender.com)


### 2. Frontend (Netlify)
- Go to [Netlify](https://www.netlify.com/).
- Import your GitHub repo.
- Root directory → `frontend/`
- Build command:  
npm run build

- Publish directory:  
build

- Add Environment Variable:  
VITE_API_URL=https://noteapp-backend.onrender.com/api

- Deploy 🎉  
👉 After deploy, you will get a link like:  
[https://noteapp-frontend.netlify.app](https://noteapp-frontend.netlify.app)

---

## 📷 Screenshots
Add your app screenshots here (Login Page, Dashboard, Notes UI, etc.)

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

---

## 📜 License
This project is licensed under the MIT License.

---

## 👨‍💻 Author
Om Hari Shukla  
🔗 [GitHub](https://github.com/Omhari66)

---

⚡ Ye file ab **100% complete** hai bhai.  
Bas `.env` me sahi **Mongo URI + JWT Secret** daalna na bhoolna.  

.env.example
# Backend Environment Variables
PORT=5000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_jwt_secret

# Frontend Environment Variables
VITE_API_URL=http://localhost:5000/api

