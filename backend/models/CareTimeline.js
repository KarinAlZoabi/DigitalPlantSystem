const mongoose = require("mongoose");

const careTimelineSchema = new mongoose.Schema({
  userPlantId: { type: mongoose.Schema.Types.ObjectId, ref: "UserPlant" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  type: String, // water / fertilize / note
  note: String
}, { timestamps: true });

module.exports = mongoose.model("CareTimeline", careTimelineSchema);