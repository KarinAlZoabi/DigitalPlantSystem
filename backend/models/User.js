//user model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true, lowercase:true, trim: true },
  passwordHash: String,
  role: { type: String, default: "user", enum: ["user", "admin"] },
  numberOfPlantsOwned: { type: Number, default: 0 },
  profilePicture: { type: String, default: null },
    resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);