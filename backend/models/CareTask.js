const mongoose = require("mongoose");

const careTaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userPlantId: { type: mongoose.Schema.Types.ObjectId, ref: "UserPlant" },

  taskType: String, // watering / fertilizing
  dueDate: Date,

  completed: { type: Boolean, default: false },
  completedAt: Date,

  status: String // pending / completed / overdue
}, { timestamps: true });

module.exports = mongoose.model("CareTask", careTaskSchema);