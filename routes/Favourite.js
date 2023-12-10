const { favouriteModel } = require("../models/Favourite");

const favouriteRouter = require("express").Router();

favouriteRouter.post("/add", async (req, res) => {
  try {
    const favouriteData = req.body;
    const existingfavourite = await favouriteModel.findOne({
      userID: favouriteData.userID,
    });

    if (existingfavourite) {

      let searchexisting = existingfavourite.favouriteList.find((el)=>el._id===favouriteData.favouriteList[0]._id);

      console.log(searchexisting)

      await favouriteModel.updateOne(
        { userID: favouriteData.userID },
        { $push: { favouriteList: { $each: favouriteData.favouriteList } } }
      );
      res
        .status(200)
        .json({ status: true, message: "favourite added successfully" });
    } else {
      // Create a new favourite document
      const newfavourite = new favouriteModel(favouriteData);
      await newfavourite.save();
      res
        .status(201)
        .json({ status: true, message: "favourite added successfully" });
    }
  } catch (error) {
    res.json({ status: false, message: "Something went wrong" });
  }
});

favouriteRouter.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    let favourite = await favouriteModel.find({ userID: userid });
    res.json({ status: true, message: favourite });
  } catch (error) {
    res.json({ status: false, message: "Something went wrong" });
  }
});

favouriteRouter.get("/:userid/:favouriteid", async (req, res) => {
  const { userid, favouriteid } = req.params;

  const favouriteDetailes = await favouriteModel.findOne({ userID: userid });

  if (favouriteDetailes) {
    // If the document is found, search for the specific favourite object in favouriteList
    const favouriteDetails = favouriteDetailes.favouriteList.find(
      (favourite) => favourite.id === favouriteid
    );

    if (favouriteDetails) {
      // favourite details for the specified favouriteid are found
      res.json({ favouriteDetails: favouriteDetails });
    } else {
      res.json("favourite with specified ID not found.");
    }
  } else {
    res.json("Document with specified userid not found.");
  }
});

favouriteRouter.delete("/:userid/:favouriteid", async (req, res) => {
  // Express.js route to delete a favourite entry
  try {
    const { userid, favouriteid } = req.params;

    // Find the user's document by userID
    const user = await favouriteModel.findOne({ userID: userid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use $pull to remove the favourite entry by its _id
    user.favouriteList.pull({ _id: favouriteid });

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .json({ message: "favourite entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting favourite entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  favouriteRouter,
};
