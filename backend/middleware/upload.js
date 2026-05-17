// Middleware to validate image uploads before saving them to MongoDB GridFS

const multer = require("multer");

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function createUploader() {
  return multer({
    storage: multer.memoryStorage(),

    fileFilter: (req, file, cb) => {
      if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG, PNG, and WebP images are allowed"), false);
      }
    },

    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB
    },
  });
}

const profileUpload = createUploader();
const plantUpload = createUploader();

function handleUploadError(err, req, res, next) {
  if (!err) return next();

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      error: "Image must be smaller than 5 MB.",
    });
  }

  return res.status(400).json({
    error: err.message || "Image upload failed.",
  });
}

module.exports = {
  profileUpload,
  plantUpload,
  handleUploadError,
};