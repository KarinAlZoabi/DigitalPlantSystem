//controller to manage the care timeline of plants
const CareTimeline = require("../models/CareTimeline");

//fetch the historu=y of care
exports.getTimeline = async (req, res) => {
  try {
    const { userPlantId } = req.query;
    const query = { userId: req.user.id };
    if (userPlantId) query.userPlantId = userPlantId;

    const timeline = await CareTimeline.find(query).sort({ createdAt: -1 }).limit(50);
    res.json(timeline);
  } catch { res.status(500).json({ error: "Server error" }); }
};

//add manual text note to plant care timeline
exports.addNote = async (req, res) => {
  try {
    const { userPlantId, note } = req.body;
    const entry = await CareTimeline.create({
      userPlantId, userId: req.user.id, type: "note", note
    });
    res.status(201).json(entry);
  } catch { res.status(500).json({ error: "Server error" }); }
};
