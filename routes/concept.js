const express = require("express");
const router = express.Router();
const axios = require("axios");
const verifyToken = require("../middleware/verifyToken");
require("dotenv").config(); // Load environment variables from .env

// Get the OpenAI API key from environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;

// Concept Explanation Route
router.post("/explain", verifyToken, async (req, res) => {
  try {
    const { conceptName } = req.body;

    // Check if the conceptName is provided in the request
    if (!conceptName) {
      return res.status(400).json({ error: "ConceptName is required" });
    }

    // Define a prompt for ChatGPT to generate an explanation
    const userPrompt = `${conceptName}`;

    // Create a conversation with a system message and user prompt
    const conversation = [
      {
         role: "system",
         content: "You are a very experience teacher, student love your teaching you explain comprehensively every concept using Richard Feynman's techniques (Mandatory), real-life analogies, first principle and practical formulas if applicable. You always guide the student to ask questions that promote a deeper understanding of the concept. You also Share the link to the diagram or documentation if possible. Also you, comprehensively explain the formula with the suitable problem, whenever it is applicable."
  },

      { role: "user", content: userPrompt },
    ];

    // Make a POST request to the ChatGPT endpoint
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: conversation,
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response from the OpenAI API is valid
    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      // Extract the assistant's reply from the API response
      const explanation = response.data.choices[0].message.content;

      // Send the explanation as is
      res.json({ explanation });
    } else {
      console.error("Unexpected response format:", response);
      res.status(500).json({
        error: "An error occurred while processing the response",
      });
    }
  } catch (error) {
    console.error("Error while fetching concept explanation:", error);
    res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
});

module.exports = router;



































// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const verifyToken = require("../middleware/verifyToken");
// require("dotenv").config(); // Load environment variables from .env

// // Get the OpenAI API key from environment variables
// const openaiApiKey = process.env.OPENAI_API_KEY;

// // Concept Explanation Route
// router.post("/explain", verifyToken, async (req, res) => {
//   try {
//     const { conceptName } = req.body;

//     // Check if the conceptName is provided in the request
//     if (!conceptName) {
//       return res.status(400).json({ error: "ConceptName is required" });
//     }

//     // Define a prompt for ChatGPT to generate an explanation
//     const userPrompt = ${conceptName};

//     // Create a conversation with a system message and user prompt
//     const conversation = [
//       {
//         role: "system",
//         content:
//           "You are a very experience teacher, student love your teaching you explain comprehensively every concept using Richard Feynman's techniques (Mandatory), real-life analogies, first principle and practical formulas if applicable. You always guide the student to ask questions that promote a deeper understanding of the concept. You also Share the link to the diagram or documentation if possible. Also you, comprehensively explain the formula with the suitable problem, whenever it is applicable.",
//         // (also you explain in a very structured manner, maintain paragraph, heading etc and always explain using feynman techniques and real-life analogies)
//       },
//       {
//         role: "user",
//         content: userPrompt, // Replace 'userPrompt' with the actual user's input or concept name
//       },
//       {
//         role: "assistant",
//         content: "", // Leave this empty for the AI's response
//       },
//     ];

//     // Make a POST request to the ChatGPT endpoint
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: conversation,
//       },
//       {
//         headers: {
//           Authorization: Bearer ${openaiApiKey},
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Check if the response from the OpenAI API is valid
//     if (
//       response.data &&
//       response.data.choices &&
//       response.data.choices.length > 0
//     ) {
//       // Extract the assistant's reply from the API response
//       const explanation = response.data.choices[0].message.content;

//       // Send the explanation as is
//       res.json({ explanation });
//     } else {
//       console.error("Unexpected response format:", response);
//       res.status(500).json({
//         error: "An error occurred while processing the response",
//       });
//     }
//   } catch (error) {
//     console.error("Error while fetching concept explanation:", error);
//     res.status(500).json({
//       error: "An error occurred while processing the request",
//     });
//   }
// });

// module.exports = router;