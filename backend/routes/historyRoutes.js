// routes/historyRoutes.js
const express = require("express");
const router = express.Router();
const History = require("../models/History");
const authMiddleware = require("../middleware/authMiddleware");

// Save commute history
router.post("/", authMiddleware, async (req, res) => {
  const { start, destination } = req.body;
  try {
    const newHistory = new History({
      userId: req.user.id,
      start,
      destination
    });
    await newHistory.save();
    res.status(201).json({ message: "History saved", history: newHistory });
  } catch (err) {
    res.status(500).json({ error: "Failed to save history" });
  }
});

// Get commute history
router.get("/", authMiddleware, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
