const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const conceptRoutes = require("./routes/concept");
const {historyRouter} = require("./routes/History");
const { favouriteRouter } = require("./routes/Favourite");
const { feedbackRouter } = require("./routes/feedback");
require('dotenv').config(); // Load environment variables from .env


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB using Mongoose (replace with your MongoDB URL)
mongoose.connect(
  "mongodb+srv://rissotanuj:rissotanuj@cluster0.hq3qqqt.mongodb.net/educationDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Test MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define API routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the education app API!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/concept", conceptRoutes);
app.use("/api/history", historyRouter);
app.use("/api/favourite", favouriteRouter);
app.use("/api/feedback", feedbackRouter);


// Error-handling middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Start the server

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
