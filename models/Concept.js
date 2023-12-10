const mongoose = require("mongoose");

const conceptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Concept = mongoose.model("Concept", conceptSchema);

module.exports = Concept;

