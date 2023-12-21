const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true }, // Changing the field to 'email' and adding uniqueness constraint
  password: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
