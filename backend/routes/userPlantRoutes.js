//user plant routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getUserPlants, getUserPlantById, addUserPlant, updateUserPlantNickname, markWatered, markFertilized, removeUserPlant, 
} = require("../controllers/userPlantController");

router.get("/", auth, getUserPlants);
router.post("/", auth, addUserPlant);
router.get("/:id", auth, getUserPlantById);
router.put("/:id/nickname", auth, updateUserPlantNickname);
router.post("/:id/water", auth, markWatered);
router.post("/:id/fertilize", auth, markFertilized);
router.delete("/:id", auth, removeUserPlant);

module.exports = router;
