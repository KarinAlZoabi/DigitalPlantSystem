//controller to manage the plant types in the database
const path = require("path");
const fs = require("fs");
const PlantType = require("../models/PlantType");

//convert relative database paths to absolute system paths
const getAbsolutePath = (urlPath) => {
  return path.join(__dirname, "../../DigitalPlantCareSystem/public", urlPath);
};

//fetch all plants
exports.getAllPlantTypes = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const plantTypes = await PlantType.find(query).sort({ name: 1 });
    res.json(plantTypes);
  } catch { res.status(500).json({ error: "Server error" }); }
};

//fetch details of a single plant using id
exports.getPlantTypeById = async (req, res) => {
  try {
    const pt = await PlantType.findById(req.params.id);
    if (!pt) return res.status(404).json({ error: "Not found" });
    res.json(pt);
  } catch { res.status(500).json({ error: "Server error" }); }
};

//create a new plant type
exports.createPlantType = async (req, res) => {
  try {
    const payload = JSON.parse(req.body.data || "{}");

    if (req.file) {
      // map the uploaded file to the imagePath field for database storage
      payload.imagePath = `/images/UserUploadedPlants/${req.file.filename}`;
    }

    const pt = await PlantType.create(payload);
    res.status(201).json(pt);
  } catch (err) {
    //if DB creation fails but an image was uploaded, delete the orphaned file
    if (req.file) {
      const filePath = path.join(__dirname, "../../DigitalPlantCareSystem/public/images/UserUploadedPlants", req.file.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.status(400).json({ error: err.message });
  }
};

//update plant type data
exports.updatePlantType = async (req, res) => {
  try {
    const payload = JSON.parse(req.body.data || "{}");

    if (req.file) {
      const existing = await PlantType.findById(req.params.id);
      if (existing?.imagePath) {
        const oldFile = getAbsolutePath(existing.imagePath);
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
      }
      payload.imagePath = `/images/UserUploadedPlants/${req.file.filename}`;
    }

    const pt = await PlantType.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!pt) return res.status(404).json({ error: "Not found" });
    res.json(pt);
  } catch (err) {
    if (req.file) {
      const filePath = getAbsolutePath(`/images/UserUploadedPlants/${req.file.filename}`);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.status(500).json({ error: "Server error" });
  }
};

//delete plant type
exports.deletePlantType = async (req, res) => {
  try {
    const pt = await PlantType.findById(req.params.id);
    if (pt?.imagePath) {
      const filePath = getAbsolutePath(pt.imagePath);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await PlantType.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};