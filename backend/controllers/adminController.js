//controller for admin dashboard
const User = require("../models/User");
const UserPlant = require("../models/UserPlant");
const PlantType = require("../models/PlantType");

exports.getStats = async (req, res) => {
  try {
    //get the total number of users in the database
    const totalUsers = await User.countDocuments({ role: "user" });
    const normalUsers = await User.find({role: "user"}).select("_id");
    const normalUserIds = normalUsers.map((user) => user._id);
    //get total plant types
    const totalPlantTypes = await PlantType.countDocuments();
    //get the total number of plants user have on their accounts
    const totalUserPlants = await UserPlant.countDocuments({userId: {$in: normalUserIds}});
    //calculate the average plant number by user
    const avgPlantsPerUser = totalUsers > 0 ? (totalUserPlants / totalUsers).toFixed(1) : 0;
    //filter recently added plants
    const recentPlants = await PlantType.find().sort({ createdAt: -1 }).limit(5);
    res.json({ totalUsers, totalPlantTypes, totalUserPlants, avgPlantsPerUser, recentPlants });
  } catch { res.status(500).json({ error: "Server error" }); }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
    res.json(users);
  } catch { res.status(500).json({ error: "Server error" }); }
};
