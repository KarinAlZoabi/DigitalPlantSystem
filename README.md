# Digital Plant Care System

Digital Plant Care System is a full-stack web application that helps users manage and monitor the care of their plants. The system allows users to create accounts, add plants to their personal collection, track care tasks, view plant details, update profiles, and reset passwords. It also includes an admin dashboard for managing the plant database and care schedules.

## Features

### User Features

- User registration and login
- JWT-based authentication
- Forgot password and reset password via email
- User profile management
- Profile picture upload
- Add plants to personal collection
- View plant details
- Track plant care tasks
- View upcoming care schedule
- Delete account

### Admin Features

- Admin dashboard
- View system statistics
- Manage plant database
- Add, edit, and delete plant types
- Manage plant care rules
- View care schedule information

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Styled Components
- CSS Modules / custom styles

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- Nodemailer
- Multer

## Project Structure

```txt
DigitalPlantSystem/
│
├── DigitalPlantCareSystem/      # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Backend Express application
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── package.json
└── README.md