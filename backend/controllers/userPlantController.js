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

exports.getUserPlantById = async (req, res) => {
  try {
    const { id } = req.params; // Details page uses /api/userPlants/:id

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Valid Plant ID is required" });
    }

    const plant = await UserPlant.findById(id).populate("plantTypeId");

    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    // Apply the same health status logic here
    const formattedPlant = {
      ...plant.toObject(),
      healthStatus: calculateHealthStatus(plant.careSchedule.watering.nextDue),
    };

    res.json(formattedPlant);
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ error: "Server error while fetching plant details" });
  }
};