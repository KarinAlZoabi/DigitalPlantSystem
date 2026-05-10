//controller to manage user plants
const mongoose = require("mongoose");
const UserPlant = require("../models/UserPlant");
const PlantType = require("../models/PlantType");
const CareTask = require("../models/CareTask");
const CareTimeline = require("../models/CareTimeline");
const User = require("../models/User");
const calculateHealthStatus = require("../calculateHealthStatus");

//get all plants for the logged in user
exports.getUserPlants = async (req, res) => {
  try {
    const userId = req.user.id;
    const plants = await UserPlant.find({ userId }).populate("plantTypeId");

    // Dynamic formatting: Adds a "healthStatus" field to each plant based on its watering schedule
    const formatted = plants.map((plant) => ({
      ...plant.toObject(),
      healthStatus: calculateHealthStatus(
        plant.careSchedule?.watering?.nextDue,
      ),
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//get detailed info for a specific user plant
exports.getUserPlantById = async (req, res) => {
  try {
    const plant = await UserPlant.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).populate("plantTypeId");
    if (!plant) return res.status(404).json({ error: "Not found" });
    const result = {
      ...plant.toObject(),
      healthStatus: calculateHealthStatus(
        plant.careSchedule?.watering?.nextDue,
      ),
    };
    res.json(result);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

//add a new plant to the user's collection
exports.addUserPlant = async (req, res) => {
  try {
    const { plantTypeId, nickname, location } = req.body;
    const userId = req.user.id;

    const plantType = await PlantType.findById(plantTypeId);
    if (!plantType)
      return res.status(404).json({ error: "Plant type not found" });

    const now = new Date();

    // Calculate initial "Next Due" dates based on the frequency defined in the PlantType
    const nextWater = new Date(now);
    nextWater.setDate(
      nextWater.getDate() + plantType.careRules.wateringFrequencyDays,
    );
    const nextFertilize = new Date(now);
    nextFertilize.setDate(
      nextFertilize.getDate() + plantType.careRules.fertilizingFrequencyDays,
    );

    const userPlant = await UserPlant.create({
      userId,
      plantTypeId,
      nickname,
      location: location || plantType.environment || "Indoor",
      healthStatus: "healthy",
      lastWatered: now,
      lastFertilized: now,
      careSchedule: {
        watering: { lastDone: now, nextDue: nextWater },
        fertilizing: { lastDone: now, nextDue: nextFertilize },
      },
    });

    // Create initial care tasks
    await CareTask.create([
      {
        userId,
        userPlantId: userPlant._id,
        taskType: "watering",
        dueDate: nextWater,
        status: "pending",
      },
      {
        userId,
        userPlantId: userPlant._id,
        taskType: "fertilizing",
        dueDate: nextFertilize,
        status: "pending",
      },
    ]);

    // Update user plant count
    await User.findByIdAndUpdate(userId, { $inc: { numberOfPlantsOwned: 1 } });

    const populated = await UserPlant.findById(userPlant._id).populate(
      "plantTypeId",
    );
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//marking plant as watered
exports.markWatered = async (req, res) => {
  try {
    const plant = await UserPlant.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).populate("plantTypeId");
    if (!plant) return res.status(404).json({ error: "Not found" });

    const now = new Date();
    const nextDue = new Date(now);
    nextDue.setDate(
      nextDue.getDate() + plant.plantTypeId.careRules.wateringFrequencyDays,
    );

    //update plant schedule
    plant.lastWatered = now;
    plant.careSchedule.watering.lastDone = now;
    plant.careSchedule.watering.nextDue = nextDue;
    await plant.save();

    // Complete pending watering task and create next one
    await CareTask.findOneAndUpdate(
      {
        userPlantId: plant._id,
        taskType: "watering",
        status: { $ne: "completed" },
      },
      { status: "completed", completedAt: now },
    );
    await CareTask.create({
      userId: req.user.id,
      userPlantId: plant._id,
      taskType: "watering",
      dueDate: nextDue,
      status: "pending",
    });

    // Timeline entry
    await CareTimeline.create({
      userPlantId: plant._id,
      userId: req.user.id,
      type: "watering",
    });

    const result = {
      ...plant.toObject(),
      healthStatus: calculateHealthStatus(nextDue),
    };
    res.json(result);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

//mark as fertilized
exports.markFertilized = async (req, res) => {
  try {
    const plant = await UserPlant.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).populate("plantTypeId");
    if (!plant) return res.status(404).json({ error: "Not found" });

    const now = new Date();
    const nextDue = new Date(now);
    nextDue.setDate(
      nextDue.getDate() + plant.plantTypeId.careRules.fertilizingFrequencyDays,
    );

    plant.lastFertilized = now;
    plant.careSchedule.fertilizing.lastDone = now;
    plant.careSchedule.fertilizing.nextDue = nextDue;
    await plant.save();

    await CareTask.findOneAndUpdate(
      {
        userPlantId: plant._id,
        taskType: "fertilizing",
        status: { $ne: "completed" },
      },
      { status: "completed", completedAt: now },
    );
    await CareTask.create({
      userId: req.user.id,
      userPlantId: plant._id,
      taskType: "fertilizing",
      dueDate: nextDue,
      status: "pending",
    });
    await CareTimeline.create({
      userPlantId: plant._id,
      userId: req.user.id,
      type: "fertilizing",
    });

    const result = {
      ...plant.toObject(),
      healthStatus: calculateHealthStatus(
        plant.careSchedule?.watering?.nextDue,
      ),
    };
    res.json(result);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

//remove plant from user collection
exports.removeUserPlant = async (req, res) => {
  try {
    const plant = await UserPlant.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!plant) return res.status(404).json({ error: "Not found" });

    await CareTask.deleteMany({ userPlantId: req.params.id });
    await CareTimeline.deleteMany({ userPlantId: req.params.id });
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { numberOfPlantsOwned: -1 },
    });

    res.json({ message: "Plant removed" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
