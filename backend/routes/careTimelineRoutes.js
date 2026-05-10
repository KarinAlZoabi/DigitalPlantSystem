//care timeline routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getTimeline, addNote } = require("../controllers/careTimelineController");

router.get("/", auth, getTimeline);
router.post("/note", auth, addNote);

module.exports = router;
