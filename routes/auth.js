const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const config = require("../config");
require('dotenv').config(); // Load environment variables from .env


const secretKey = process.env.SECRET_KEY;
// const openaiApiKey = process.env.OPENAI_API_KEY;



// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password doesn't match" });
    }

    // Generate and send JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
    });

    res.json({ token, userID: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});




module.exports = router;
