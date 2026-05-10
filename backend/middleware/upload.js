//middleware to help in uploading images to the website
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function createUploader(subfolder, namingFn) {
  const dir = path.join(__dirname, "../../DigitalPlantCareSystem/public/images", subfolder);
  
  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, dir),
      filename: namingFn,
    }),
    fileFilter: (req, file, cb) => {
      if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG, PNG, and WebP images are allowed"), false);
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  });
}

// Profile pictures
const profileUpload = createUploader("profile-pics", (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, `user_${req.user.id}${ext}`);
});

// Plant images
const plantUpload = createUploader("UserUploadedPlants", (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, `plant_${Date.now()}${ext}`);
});
// Explicitly export as an object
module.exports = { 
  profileUpload, 
  plantUpload 
};