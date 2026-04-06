const mongoose = require("mongoose");

const userPlantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 
  plantTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "PlantType" }, // 
  nickname: String, // 
  location: String, // 
  healthStatus: String, // 
  
  // Embedded document for care schedule 
  careSchedule: {
    watering: {
      lastDone: Date,
      nextDue: Date
    },
    fertilizing: {
      lastDone: Date,
      nextDue: Date
    }
  },
  
  lastWatered: Date, // 
  lastFertilized: Date, // 
  addedAt: { type: Date, default: Date.now } // 
});

module.exports = mongoose.model("UserPlant", userPlantSchema);