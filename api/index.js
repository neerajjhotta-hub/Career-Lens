require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const { analyzeCareer } = require("../server/analyzeCareer");

const app = express();

app.use(cors());
app.use(express.json());

// CareerLens prediction API
app.post("/api/predict", async (req, res) => {
  const { title, experience, country, techStack } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Job title is required." });
  }
  if (!experience || !experience.trim()) {
    return res.status(400).json({ error: "Experience level is required." });
  }
  if (!country || !country.trim()) {
    return res.status(400).json({ error: "Country is required." });
  }
  if (!techStack || !techStack.trim()) {
    return res.status(400).json({ error: "Tech stack is required." });
  }

  try {
    const result = await analyzeCareer({
      title: title.trim(),
      experience: experience.trim(),
      country: country.trim(),
      techStack: techStack.trim()
    });

    res.json(result);
  } catch (err) {
    console.error("Vercel Function Prediction error:", err);
    res.status(500).json({
      error: err.message || "An unexpected error occurred during prediction."
    });
  }
});

// Export the Express app for Vercel Serverless Function deployment
module.exports = app;
