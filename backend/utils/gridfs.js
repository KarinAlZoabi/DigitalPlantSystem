const mongoose = require("mongoose");

function getBucket() {
  if (!mongoose.connection.db) {
    throw new Error("MongoDB connection is not ready.");
  }

  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function toObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}

function uploadBufferToGridFS(file, metadata = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("No file buffer received."));
    }

    const bucket = getBucket();

    const safeOriginalName = file.originalname.replace(/\s+/g, "_");
    const filename = `${Date.now()}-${safeOriginalName}`;

    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        ...metadata,
        originalName: file.originalname,
        contentType: file.mimetype,
      },
    });

    uploadStream.on("error", reject);

    uploadStream.on("finish", () => {
      resolve({
        fileId: uploadStream.id.toString(),
        filename,
        contentType: file.mimetype,
      });
    });

    uploadStream.end(file.buffer);
  });
}

async function deleteGridFSFile(fileId) {
  if (!fileId || !isValidObjectId(fileId)) return;

  const bucket = getBucket();

  try {
    await bucket.delete(toObjectId(fileId));
  } catch (err) {
    // Ignore missing files so deletion does not crash account/plant deletion
    if (err.message && err.message.includes("FileNotFound")) return;
    throw err;
  }
}

function buildFileUrl(req, fileId) {
  return `${req.protocol}://${req.get("host")}/api/files/${fileId}`;
}

module.exports = {
  getBucket,
  isValidObjectId,
  toObjectId,
  uploadBufferToGridFS,
  deleteGridFSFile,
  buildFileUrl,
};