const express = require("express");
const router = express.Router();
const {
  getUserPlants,
  addUserPlant,
  getUserPlantById
} = require("../controllers/userPlantController");

router.get("/", getUserPlants);
// router.post("/", addUserPlant);
router.get("/:id", getUserPlantById);

module.exports = router;