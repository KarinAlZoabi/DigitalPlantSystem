//care task routes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getUserTasks, completeTask } = require("../controllers/careTaskController");

router.get("/", auth, getUserTasks);
router.post("/:id/complete", auth, completeTask);

module.exports = router;
