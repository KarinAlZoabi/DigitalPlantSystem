// Controller to manage the plant types in the database

const PlantType = require("../models/PlantType");
const UserPlant = require("../models/UserPlant");

const {
  uploadBufferToGridFS,
  deleteGridFSFile,
  buildFileUrl,
} = require("../utils/gridfs");

// Fetch all plants
exports.getAllPlantTypes = async (req, res) => {
  try {
    const { search } = req.query;

    const query = search
  ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { scientificName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    }
  : {};

    const plantTypes = await PlantType.find(query).sort({ name: 1 });

    res.json(plantTypes);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch details of a single plant using id
exports.getPlantTypeById = async (req, res) => {
  try {
    const pt = await PlantType.findById(req.params.id);

    if (!pt) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(pt);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new plant type
exports.createPlantType = async (req, res) => {
  let uploadedFile = null;

  try {
    const payload = JSON.parse(req.body.data || "{}");

    if (req.file) {
      uploadedFile = await uploadBufferToGridFS(req.file, {
        type: "plant-type",
      });

      payload.imageFileId = uploadedFile.fileId;
      payload.imagePath = buildFileUrl(req, uploadedFile.fileId);
    }

    const pt = await PlantType.create(payload);

    res.status(201).json(pt);
  } catch (err) {
    if (uploadedFile?.fileId) {
      await deleteGridFSFile(uploadedFile.fileId);
    }

    res.status(400).json({ error: err.message });
  }
};

// Update plant type data
exports.updatePlantType = async (req, res) => {
  let uploadedFile = null;

  try {
    const existing = await PlantType.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "Not found" });
    }

    const payload = JSON.parse(req.body.data || "{}");

    if (req.file) {
      uploadedFile = await uploadBufferToGridFS(req.file, {
        type: "plant-type",
        plantTypeId: req.params.id,
      });

      payload.imageFileId = uploadedFile.fileId;
      payload.imagePath = buildFileUrl(req, uploadedFile.fileId);
    }

    const pt = await PlantType.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (req.file && existing.imageFileId) {
      await deleteGridFSFile(existing.imageFileId);
    }

    res.json(pt);
  } catch (err) {
    if (uploadedFile?.fileId) {
      await deleteGridFSFile(uploadedFile.fileId);
    }

    res.status(500).json({ error: err.message || "Server error" });
  }
};

// Delete plant type
exports.deletePlantType = async (req, res) => {
  try {
    const used = await UserPlant.exists({ plantTypeId: req.params.id });

    if (used) {
      return res.status(400).json({
        error: "Cannot delete this plant because users currently own it.",
      });
    }

    const pt = await PlantType.findById(req.params.id);

    if (!pt) {
      return res.status(404).json({ error: "Not found" });
    }

    if (pt.imageFileId) {
      await deleteGridFSFile(pt.imageFileId);
    }

    await PlantType.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};