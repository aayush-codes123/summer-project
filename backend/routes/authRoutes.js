const express = require("express");
const { signup, login, getProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.get("/profile", authMiddleware, getProfile);
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
