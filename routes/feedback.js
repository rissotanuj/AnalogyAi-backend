const feedbackModel = require("../models/Feedback");

const feedbackRouter = require("express").Router();

feedbackRouter.post("/add", async (req, res) => {
    try {
      const payload = req.body;
      console.log(payload)
    const feedback = await feedbackModel(payload);
    await feedback.save();
    res.send({ status: true, message: "Feedback added" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Something went wrong" });
  }
});

feedbackRouter.get("/", async (req, res) => {
  try {
    const feedback = await feedbackModel.find();
    res.send({ status: true, message: feedback });
  } catch (err) {
    res.send({ status: false, message: "Something went wrong" });
  }
});


module.exports={
    feedbackRouter
}