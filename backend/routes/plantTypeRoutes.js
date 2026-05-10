//plant type routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const { plantUpload } = require("../middleware/upload");
const {
  getAllPlantTypes,
  getPlantTypeById,
  createPlantType,
  updatePlantType,
  deletePlantType,
} = require("../controllers/plantTypeController");

router.get("/", auth, getAllPlantTypes);
router.get("/:id", auth, getPlantTypeById);


router.post("/", auth, adminOnly, plantUpload.single("image"), createPlantType);
router.put("/:id", auth, adminOnly, plantUpload.single("image"), updatePlantType);

router.delete("/:id", auth, adminOnly, deletePlantType);

module.exports = router;