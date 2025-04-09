
# Right Direction 🧭

Right Direction is a full-stack navigation web application designed to provide users with accurate route information, fare estimation, traffic updates, and a personalized commute history. Built using React for the frontend and Express.js with MongoDB for the backend, it ensures real-time interaction, authentication, and an intuitive user experience.

---

## 🔧 Features

- 🚀 Route Finder: Enter source and destination to get the best route.
- 💵 Fare Estimation: Calculates estimated fare for your journey.
- 🚦 Traffic Updates: Real-time traffic conditions.
- 🧑‍💼 Authentication: Secure login/signup for personalized experience.
- 🗺️ Commute History: Keeps record of user journeys.
- 🎨 Interactive UI: Built with React, styled for clarity and responsiveness.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- CSS 
- Axios (for API communication)

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)

**APIs & Libraries:**
- OpenStreetMap for navigation
- JWT for authentication
- dotenv for environment management

---

## 📁 Project Structure

```
RightDirection/
│
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
│
├── server/                 # Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/Vaibhav0911/commuter.git
cd right-direction
```

2. **Setup the backend:**

```bash
cd server
npm install
node server.js
```

3. **Setup the frontend:**

```bash
cd client
npm install
npm start
```

4. **Configure Environment:**
- Create `.env` files in both frontend and backend directories.
- Include keys like:
  - `MONGO_URI`
  - `JWT_SECRET`

---

## 📌 Contributors

- 👤 **[Vaibhav chauhan, Rohit kainture, Aryan Singh]** - Full-stack Developer  
- 🛠️ Contributions welcome!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
