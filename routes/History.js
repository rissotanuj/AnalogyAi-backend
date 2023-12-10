const { historyModel } = require("../models/History");

const historyRouter = require("express").Router();

historyRouter.post("/add", async (req, res) => {
  try {
    const historyData = req.body;
    const existingHistory = await historyModel.findOne({
      userID: historyData.userID,
    });

    if (existingHistory) {
      await historyModel.updateOne(
        { userID: historyData.userID },
        { $push: { historyList: { $each: historyData.historyList } } }
      );
      res
        .status(200)
        .json({ status: true, message: "History added successfully" });
    } else {
      // Create a new History document
      const newHistory = new historyModel(historyData);
      await newHistory.save();
      res
        .status(201)
        .json({ status: true, message: "History added successfully" });
    }
  } catch (error) {
    res.json({ status: false, message: "Something went wrong" });
  }
});

historyRouter.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    let history = await historyModel.find({ userID: userid });
    res.json({ status: true, message: history });
  } catch (error) {
    res.json({ status: false, message: "Something went wrong" });
  }
});

historyRouter.get("/:userid/:historyid", async (req, res) => {
  const { userid, historyid } = req.params;

  const historyDetailes = await historyModel.findOne({ userID: userid });

  if (historyDetailes) {
    // If the document is found, search for the specific history object in historyList
    const historyDetails = historyDetailes.historyList.find(
      (history) => history.id === historyid
    );

    if (historyDetails) {
      // history details for the specified historyid are found
      res.json({ historyDetails: historyDetails });
    } else {
      res.json("history with specified ID not found.");
    }
  } else {
    res.json("Document with specified userid not found.");
  }
});

historyRouter.delete("/:userid/:historyid", async (req, res) => {
  // Express.js route to delete a history entry
  try {
    const { userid, historyid } = req.params;

    // Find the user's document by userID
    const user = await historyModel.findOne({ userID: userid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use $pull to remove the history entry by its _id
    user.historyList.pull({ _id: historyid });

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .json({ message: "History entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting history entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  historyRouter,
};
