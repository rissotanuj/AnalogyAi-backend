const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  star: { type: String},
  feedback: { type: String},
});

const feedbackModel = mongoose.model("feedback", feedbackSchema);

module.exports = feedbackModel;

