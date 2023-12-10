// middleware/authenticate.js
const jwt = require("jsonwebtoken");
// const config = require("../config/config");

require('dotenv').config(); // Load environment variables from .env

const secretKey = process.env.SECRET_KEY;


module.exports = (req, res, next) => {
  const token = req.header("Authorization");
 
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Please login again for search any concept" });
  }
};
