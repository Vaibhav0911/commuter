const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes (No authentication required)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (Require authentication)
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Access granted to profile", user: req.user });
});

module.exports = router;
