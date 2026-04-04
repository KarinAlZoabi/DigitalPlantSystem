const UserPlant = require("../models/UserPlant");
const PlantType = require("../models/PlantType");

// GET all plants for a user
exports.getUserPlants = async (req, res) => {
  try {
    const userId = req.query.userId;

    const plants = await UserPlant.find({ userId })
      .populate("plantTypeId");

    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD a plant
exports.addUserPlant = async (req, res) => {
  try {
    const newPlant = new UserPlant(req.body);
    await newPlant.save();

    res.status(201).json(newPlant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single plant
exports.getUserPlantById = async (req, res) => {
  try {
    const plant = await UserPlant.findById(req.params.id)
      .populate("plantTypeId");

    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};