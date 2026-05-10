//controller to manage lifecycle of care tasks
const CareTask = require("../models/CareTask");
const UserPlant = require("../models/UserPlant");
const CareTimeline = require("../models/CareTimeline");
const PlantType = require("../models/PlantType");
const calculateHealthStatus = require("../calculateHealthStatus");

//fetch all active tasks for a user
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    // Recalculate overdue status
    await CareTask.updateMany(
      { userId, status: "pending", dueDate: { $lt: now } },
      { status: "overdue" },
    );

    //fetch tasks that aren't finished
    const tasks = await CareTask.find({ userId, status: { $ne: "completed" } })
      .populate({ path: "userPlantId", populate: { path: "plantTypeId" } })
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

//mark task as done and scehdule the next one
exports.completeTask = async (req, res) => {
  try {
    const task = await CareTask.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) return res.status(404).json({ error: "Not found" });

    const now = new Date();
    task.status = "completed";
    task.completedAt = now;
    await task.save();

    // Recalculate next due date
    const plant = await UserPlant.findById(task.userPlantId).populate(
      "plantTypeId",
    );
    if (plant) {
      const freqDays =
        task.taskType === "watering"
          ? plant.plantTypeId.careRules.wateringFrequencyDays
          : plant.plantTypeId.careRules.fertilizingFrequencyDays;

      const nextDue = new Date(now);
      nextDue.setDate(nextDue.getDate() + freqDays);

      if (task.taskType === "watering") {
        plant.lastWatered = now;
        plant.careSchedule.watering.lastDone = now;
        plant.careSchedule.watering.nextDue = nextDue;
      } else {
        plant.lastFertilized = now;
        plant.careSchedule.fertilizing.lastDone = now;
        plant.careSchedule.fertilizing.nextDue = nextDue;
      }
      await plant.save();

      // Create new task
      await CareTask.create({
        userId: req.user.id,
        userPlantId: plant._id,
        taskType: task.taskType,
        dueDate: nextDue,
        status: "pending",
      });

      // Timeline entry
      await CareTimeline.create({
        userPlantId: plant._id,
        userId: req.user.id,
        type: task.taskType,
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
