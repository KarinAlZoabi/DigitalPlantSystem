//authentication routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { profileUpload } = require("../middleware/upload");
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  uploadProfilePicture,
  deleteAccount,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/profile-picture", auth, profileUpload.single("picture"), uploadProfilePicture);
router.delete("/account", auth, deleteAccount);

module.exports = router;