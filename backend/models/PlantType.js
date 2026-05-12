// Plant type model
const mongoose = require("mongoose");

const plantTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plant name is required."],
      trim: true,
    },

    scientificName: {
      type: String,
      required: [true, "Scientific name is required."],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },

    difficulty: {
      type: String,
      required: [true, "Difficulty is required."],
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "Difficulty must be Easy, Medium, or Hard.",
      },
    },

    environment: {
      type: String,
      required: [true, "Environment is required."],
      enum: {
        values: ["Indoor", "Outdoor", "Indoor/Outdoor"],
        message: "Environment must be Indoor, Outdoor, or Indoor/Outdoor.",
      },
    },

    careRules: {
      wateringFrequencyDays: {
        type: Number,
        required: [true, "Watering frequency is required."],
        min: [1, "Watering frequency must be at least 1 day."],
      },

      fertilizingFrequencyDays: {
        type: Number,
        required: [true, "Fertilizing frequency is required."],
        min: [1, "Fertilizing frequency must be at least 1 day."],
      },

      sunlight: {
        type: String,
        required: [true, "Sunlight requirement is required."],
        trim: true,
      },

      notes: {
        type: String,
        trim: true,
        default: "",
      },
    },

    imagePath: {
      type: String,
      required: [true, "Plant image is required."],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlantType", plantTypeSchema);