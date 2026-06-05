const { analyzeCareer } = require("../server/analyzeCareer");

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

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
    console.error("Vercel Serverless Function error:", err);
    res.status(500).json({
      error: err.message || "An unexpected error occurred during prediction."
    });
  }
};
