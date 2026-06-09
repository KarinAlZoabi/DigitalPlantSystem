//authentication and profile management controller
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const UserPlant = require("../models/UserPlant");
const CareTask = require("../models/CareTask");
const CareTimeline = require("../models/CareTimeline");

const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");

const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profilePicture: user.profilePicture,
});

const {
  uploadBufferToGridFS,
  deleteGridFSFile,
  buildFileUrl,
} = require("../utils/gridfs");

const JWT_SECRET = process.env.JWT_SECRET;

//  Email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
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

    if (!user.passwordHash) {
  return res.status(400).json({
    error: "This account uses Google sign-in. Please continue with Google.",
  });
}

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

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: "Valid email is required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "This email is already taken.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name.trim(),
        email: normalizedEmail,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-passwordHash");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
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
  let uploadedFile = null;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const existingUser = await User.findById(req.user.id);

    uploadedFile = await uploadBufferToGridFS(req.file, {
      type: "profile-picture",
      userId: req.user.id,
    });

    const profilePictureUrl = buildFileUrl(req, uploadedFile.fileId);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        profilePicture: profilePictureUrl,
        profilePictureFileId: uploadedFile.fileId,
      },
      { new: true },
    ).select("-passwordHash");

    if (existingUser?.profilePictureFileId) {
      await deleteGridFSFile(existingUser.profilePictureFileId);
    }

    res.json({ profilePicture: user.profilePicture });
  } catch (err) {
    if (uploadedFile?.fileId) {
      await deleteGridFSFile(uploadedFile.fileId);
    }

    console.error("Profile picture upload error:", err);
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

    // Create a raw token for the email link
    const token = crypto.randomBytes(32).toString("hex");

    // Store only the hashed token in the database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const requestId = crypto.randomBytes(4).toString("hex").toUpperCase();

    await transporter.sendMail({
      from: `"PlantCare" <${process.env.EMAIL_USER}>`,
      to: user.email,

      // This makes Gmail treat each reset email as a fresh thread
      subject: `Reset your PlantCare password - ${requestId}`,

      headers: {
        "X-Entity-Ref-ID": requestId,
        References: "",
        "In-Reply-To": "",
      },

      html: `
  <div style="margin:0; padding:0; background:#f3f8f1; font-family:Arial, sans-serif;">
    <div style="max-width:560px; margin:0 auto; padding:40px 20px;">
      
      <div style="background:#ffffff; border-radius:18px; padding:36px 28px; text-align:center; box-shadow:0 8px 24px rgba(47,107,79,0.12); border:1px solid #e1ecdf;">
        
        <div style="width:64px; height:64px; background:#e4f3e1; border-radius:50%; margin:0 auto 18px; display:flex; align-items:center; justify-content:center;">
          <span style="font-size:32px;">🌿</span>
        </div>

        <h2 style="margin:0 0 12px; color:#2f6b4f; font-size:26px; font-weight:700;">
          Reset Your Password
        </h2>

        <p style="margin:0 0 20px; color:#4b5563; font-size:15px; line-height:1.6;">
          Hi ${user.name},
        </p>

        <p style="margin:0 auto 26px; color:#4b5563; font-size:15px; line-height:1.7; max-width:420px;">
          We received a request to reset your PlantCare password. Click the button below to create a new password.
        </p>

        <a href="${resetUrl}" 
          style="display:inline-block; background:#2f6b4f; color:#ffffff; padding:13px 28px; border-radius:999px; text-decoration:none; font-size:15px; font-weight:700;">
          Reset Password
        </a>

        <p style="margin:26px auto 0; color:#6b7280; font-size:13px; line-height:1.6; max-width:390px;">
          This link expires in 1 hour. If you did not request this password reset, you can safely ignore this email.
        </p>

      </div>

      <p style="text-align:center; color:#7c8b7a; font-size:12px; margin:20px 0 0;">
        PlantCare · Helping your plants stay healthy
      </p>

    </div>
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

    if (!token || !newPassword) {
      return res.status(400).json({
        error: "Token and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long.",
      });
    }

    // Hash the token from the reset link and compare it with the hashed token in MongoDB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid or expired reset token.",
      });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Reset password error:", {
      message: err.message, code: err.code, command: err.command, response: err.response, responseCode: err.responseCode
    });
    return res.status(500).json({ error: "Server error." });
  }
};

// Delete Account

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user?.profilePictureFileId) {
      await deleteGridFSFile(user.profilePictureFileId);
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


exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!process.env.GOOGLE_CLIENT_ID) {
  return res.status(500).json({
    error: "GOOGLE_CLIENT_ID is missing on Render backend.",
  });
}

if (!process.env.JWT_SECRET) {
  return res.status(500).json({
    error: "JWT_SECRET is missing on Render backend.",
  });
}

    if (!credential) {
      return res.status(400).json({ error: "Google credential is required" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const email = payload.email?.toLowerCase();
    const name = payload.name;
    const picture = payload.picture;
    const emailVerified = payload.email_verified;

    if (!email || !emailVerified) {
      return res.status(400).json({ error: "Google email is not verified" });
    }

    let user = await User.findOne({
      $or: [{ googleId }, { email }],
    });

    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        googleId,
        authProvider: "google",
        profilePicture: picture || null,
      });
    } else {
      if (!user.googleId) {
        user.googleId = googleId;
      }

      if (!user.profilePicture && picture) {
        user.profilePicture = picture;
      }

      await user.save();
    }

    const token = createToken(user);

    return res.json({
      token,
      user: formatUser(user),
    });
 } catch (error) {
    console.error("Google auth error:", error);
    return res.status(401).json({ error: "Google authentication failed" });
  }
};