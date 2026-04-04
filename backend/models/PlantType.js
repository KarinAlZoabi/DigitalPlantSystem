const mongoose = require("mongoose");

const plantTypeSchema = new mongoose.Schema({
  name: String,
  scientificName: String,
  description: String,
  difficulty: String,
  environment: String,
  careRules: {
    wateringFrequencyDays: Number,
    fertilizingFrequencyDays: Number,
    sunlight: String,
    notes: String
  },
  imagePath: String
}, { timestamps: true });

module.exports = mongoose.model("PlantType", plantTypeSchema);