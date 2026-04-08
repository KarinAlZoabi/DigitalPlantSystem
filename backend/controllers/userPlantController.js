const mongoose = require("mongoose");
require("../models/PlantType");
const UserPlant = require("../models/UserPlant");
const calculateHealthStatus = require("../calculateHealthStatus")

exports.getUserPlants = async (req, res) => {
  try {
    const { userId } = req.query;

    // 1. Check if userId exists
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // 2. Check if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const plants = await UserPlant.find({
  userId: new mongoose.Types.ObjectId(userId)
}).populate("plantTypeId");

const formattedPlants = plants.map((plant) => ({
    ...plant.toObject(),
    healthStatus: calculateHealthStatus(
      plant.careSchedule.watering.nextDue
    ),
  }));
    // 3. Always return an array, even if empty
    res.json(formattedPlants || []);
    
  } catch (err) {
    console.error("Backend Error:", err); // Log the actual error to your terminal
    res.status(500).json({ error: "Server error while fetching plants" });
  }
};