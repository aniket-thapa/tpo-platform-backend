# 🎓 Training and Placement Cell Platform (Backend)

A self-hosted web platform for colleges to manage and broadcast training and placement updates to students with ease. Built with Node.js, Express, MongoDB, and JWT authentication.

---

## ✨ Features

- Dynamic Placement Announcements
- Interview Round Notifications
- Final Selection Updates
- Role-Based Access: Admin & Student
- JWT-Based Auth System
- WebSocket Notifications (for real-time updates)
- Clean REST API Structure
- Secure Input Validation & Rate Limiting

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT
- **Real-Time**: Socket.io
- **Validation**: express-validator
- **Security**: Helmet, Rate Limiting

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/aniket-thapa/tpo-platform-backend.git
cd tpo-platform-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=your_mongodb_uri/
JWT_SECRET=supersecurejwtkey
JWT_EXPIRE=1d
ADMIN_ROLLNO=your_admin_code
```

### 4. Start the server

```bash
node server.js
```

---

## 📦 Available API Endpoints

### 🔐 Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### 📢 Placements

- `POST /api/placements` _(Admin only)_
- `GET /api/placements`
- `GET /api/placements/:id`
- `PUT /api/placements/:id` _(Admin only)_
- `DELETE /api/placements/:id` _(Admin only)_
- `PUT /api/placements//:placementId/updates/:updateId` _(Admin only)_
- `DELETE /api/placements//:placementId/updates/:updateId` _(Admin only)_

### 🗓️ Interview Rounds

- `POST /api/interviews` _(Admin only)_
- `GET /api/interviews/:placementId`
- `PUT /api/interviews/:id` _(Admin only)_
- `DELETE /api/interviews/:id` _(Admin only)_

### 🏆 Final Selections

- `POST /api/selections` _(Admin only)_
- `GET /api/selections/:placementId`
- `PUT /api/selections/:id` _(Admin only)_
- `DELETE /api/selections/:id` _(Admin only)_

---

## 🔐 Security

- JWT-based authentication
- Role-based route protection
- Input validation with `express-validator`
- Rate limiting with `express-rate-limit`
- Secure headers via `helmet`

---

## 📌 Notes

- Students are never meant to apply via the platform. They are only informed where/how to apply.

---

## 🤝 Contributing

Feel free to fork, improve, or report bugs. PRs are welcome.

---

## 📄 License

MIT – do whatever you want, just don't remove the credits.
