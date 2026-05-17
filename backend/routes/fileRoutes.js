const express = require("express");
const router = express.Router();

const {
  getBucket,
  isValidObjectId,
  toObjectId,
} = require("../utils/gridfs");

// Public image route so <img src="..."> works without custom Authorization headers
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid file ID." });
    }

    const bucket = getBucket();
    const fileId = toObjectId(id);

    const files = await bucket.find({ _id: fileId }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: "File not found." });
    }

    const file = files[0];
    const contentType = file.metadata?.contentType || "application/octet-stream";

    res.set("Content-Type", contentType);
    res.set("Cache-Control", "public, max-age=31536000");

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on("error", () => {
      return res.status(404).json({ error: "File not found." });
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error("GridFS file route error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;