//authentication and profile management controller
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const UserPlant = require("../models/UserPlant");
const CareTask = require("../models/CareTask");
const CareTimeline = require("../models/CareTimeline");

const JWT_SECRET = process.env.JWT_SECRET;

//  Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Authentication logic

//register a new user, hash password and return a JWT
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    //check if user already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    //generate JWT for immediate login after registration
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//authenticate user and return JWT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Distinct messages so the user knows exactly what went wrong
    if (!user)
      return res
        .status(400)
        .json({ error: "No account found with this email" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//Profile Management
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

//update user info
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true },
    ).select("-passwordHash");
    res.json(user);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

//verify old pass and update to new hashed pass
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!match)
      return res.status(400).json({ error: "Current password incorrect" });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// Profile Picture uploads

exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    // Build a URL the frontend can use directly in an <img> src
    const picturePath = `/images/profile-pics/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: picturePath },
      { new: true },
    ).select("-passwordHash");

    res.json({ profilePicture: user.profilePicture });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// Password recovery

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "If this email exists, a reset link was sent.",
      });
    }

    // Create a unique token and set 1-hour expiration
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // HTML Email Template
    await transporter.sendMail({
      from: `"PlantCare" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Reset your PlantCare password",
      html: `
        <div style="font-family:Poppins,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#ffffff;border-radius:16px;">
          <h2 style="color:#3A7D5D;margin-bottom:8px;">Password Reset Request</h2>
          <p style="color:#6B6B6B;font-size:15px;line-height:1.6;">
            Hi ${user.name},<br/><br/>
            We received a request to reset your PlantCare password. Click the button below to choose a new one.
          </p>
          <a href="${resetUrl}"
             style="display:inline-block;margin-top:24px;padding:13px 28px;background:#3A7D5D;
                    color:white;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px;">
            Reset Password
          </a>
          <p style="color:#9CA3AF;font-size:12px;margin-top:28px;line-height:1.5;">
            This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    res.json({ message: "If this email exists, a reset link was sent." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res
      .status(500)
      .json({ error: "Failed to send reset email. Please try again." });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ error: "Invalid or expired reset token" });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Account 

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user?.profilePicture) {
      const absolutePath = path.join(
        __dirname,
        "../../DigitalPlantCareSystem/public",
        user.profilePicture,
      );

      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }

    await CareTimeline.deleteMany({ userId });
    await CareTask.deleteMany({ userId });
    await UserPlant.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
