// Server file

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Important on Render so req.protocol becomes https instead of http
app.set("trust proxy", 1);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
const userPlantRoutes = require("./routes/userPlantRoutes");
const authRoutes = require("./routes/authRoutes");
const plantTypeRoutes = require("./routes/plantTypeRoutes");
const careTaskRoutes = require("./routes/careTaskRoutes");
const careTimelineRoutes = require("./routes/careTimelineRoutes");
const adminRoutes = require("./routes/adminRoutes");
const fileRoutes = require("./routes/fileRoutes");

// Health check
app.get("/", (req, res) => {
  res.send("Digital Plant Care API is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// Register routes
app.use("/api/userPlants", userPlantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/plantTypes", plantTypeRoutes);
app.use("/api/careTasks", careTaskRoutes);
app.use("/api/careTimeline", careTimelineRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/files", fileRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));

// Server initialization
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});