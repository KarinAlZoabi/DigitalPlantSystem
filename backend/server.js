//server file
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

//middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

//server images stored on the server so the frontend can display them in <img> tags
app.use("/images/profile-pics", express.static(path.join(__dirname, "../DigitalPlantCareSystem/public/images/profile-pics")));

//routes
const userPlantRoutes = require("./routes/userPlantRoutes");
const authRoutes = require("./routes/authRoutes");
const plantTypeRoutes = require("./routes/plantTypeRoutes");
const careTaskRoutes = require("./routes/careTaskRoutes");
const careTimelineRoutes = require("./routes/careTimelineRoutes");
const adminRoutes = require("./routes/adminRoutes");

//register the routes with specific URl prefixes
app.use("/api/userPlants", userPlantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/plantTypes", plantTypeRoutes);
app.use("/api/careTasks", careTaskRoutes);
app.use("/api/careTimeline", careTimelineRoutes);
app.use("/api/admin", adminRoutes);

//Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));

//server initialization
app.listen(5000, () => console.log("Server running on port 5000"));