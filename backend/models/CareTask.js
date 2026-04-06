const mongoose = require("mongoose");

const careTaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userPlantId: { type: mongoose.Schema.Types.ObjectId, ref: "UserPlant" },
  taskType: String,
  dueDate: Date,
  completed: { type: Boolean, default: false},
  completedAt: Date,
  status: { type: String, enum: ['pending', 'completed', 'overdue'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model("CareTask", careTaskSchema);