// authentication routes
const express = require("express");
const { rateLimit } = require("express-rate-limit");

const router = express.Router();

const auth = require("../middleware/auth");
const { profileUpload, handleUploadError } = require("../middleware/upload");

const {
  register,
  login,
  googleAuth,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  uploadProfilePicture,
  deleteAccount,
} = require("../controllers/authController");

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 3, // max 3 reset email requests per IP every 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many password reset requests. Please try again later.",
  },
});

const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // max 5 reset attempts per IP every 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many reset attempts. Please try again later.",
  },
});

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);

router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password", resetPasswordLimiter, resetPassword);

router.post(
  "/profile-picture",
  auth,
  profileUpload.single("picture"),
  handleUploadError,
  uploadProfilePicture
);

router.delete("/account", auth, deleteAccount);

module.exports = router;