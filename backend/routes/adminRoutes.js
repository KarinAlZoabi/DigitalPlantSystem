//Admin exclusive routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const { getStats, getAllUsers } = require("../controllers/adminController");

router.get("/stats", auth, adminOnly, getStats);
router.get("/users", auth, adminOnly, getAllUsers);

module.exports = router;
