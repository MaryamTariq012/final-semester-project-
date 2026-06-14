const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model ko import kiya

// 1. REGISTER API (POST /api/auth/register)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, specialization, treatmentType, fees } = req.body;

    // Check karein user pehle se toh nahi bana hua
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists!" });

    // Password ko chupayein (Encrypt karein)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naya user banayein
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      specialization,
      treatmentType,
      fees
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully! 🎉" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 2. LOGIN API (POST /api/auth/login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check karein email sahi hai ya nahi
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email or Password!" });

    // Password check karein
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Email or Password!" });

    // JWT Token generate karein (Security Feature)
    const token = jwt.sign(
      { id: user._index, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token 1 din tak valid rahega
    );

    // User ka data aur token frontend ko bhej dein
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;