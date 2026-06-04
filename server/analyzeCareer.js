const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI;
function getGenAI() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set.");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

async function analyzeCareer({ title, experience, country, techStack }) {
  const ai = getGenAI();
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const model = ai.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  const prompt = `You are a premier global tech compensation analyst, talent strategist, and technical career advisor.
Analyze the following career profile and predict highly realistic career prospects for the year 2026.

Important Instructions:
1. Provide REALISTIC outputs. Do NOT use fake, generic, or identical placeholders. The numbers and details must accurately reflect real-world compensation standards and market dynamics for the specific country and experience level.
2. Structure the salary ceiling based on the standard local currency and formatting of the given country (e.g., Lakhs/Crores INR for India, USD for USA, Euros for Germany/France, GBP for UK, etc.).
   - India example: "₹28L - ₹35L" or "₹40L - ₹55L" depending on seniority.
   - USA example: "$180,000 - $240,000" or similar.
3. Keep the output clean, highly structured, and conform strictly to the specified JSON schema.

User Profile:
- Job Title: ${title}
- Experience Level: ${experience}
- Country: ${country}
- Tech Stack: ${techStack}

JSON Schema:
{
  "salaryCeiling": {
    "range": <string: formatted range with regional currency symbol, e.g. "₹28L - ₹35L" or "$180,000 - $220,000">,
    "currency": <string: ISO currency code, e.g. "INR", "USD", "EUR", "GBP">,
    "explanation": <string: a short explanation of what drives this peak tier compensation (e.g. product vs service companies, niche skills, leadership role)>
  },
  "aiRisk": {
    "level": <string: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL">,
    "score": <number: integer from 0 to 100 representing probability of automation or significant role reduction by AI>,
    "explanation": <string: clear, logical analysis of why this job is or isn't at risk of AI replacement (e.g., reasoning about creative, strategic, or physical capabilities needed)>
  },
  "futureDemand": {
    "level": <string: "LOW" | "MEDIUM" | "HIGH" | "EXTREMELY HIGH">,
    "growthRate": <string: estimated YoY demand growth rate or trend indicator, e.g., "+15% YoY" or "Stable">,
    "explanation": <string: a sentence explaining industry drivers behind this demand level>
  },
  "promotionOpportunities": {
    "level": <string: "LOW" | "MEDIUM" | "HIGH">,
    "explanation": <string: description of the internal mobility and career progression speed for this role>
  },
  "recommendedPivot": {
    "title": <string: high-growth job title that leverages current skills, e.g., "AI Engineer", "Platform Engineer", "Solutions Architect">,
    "rationale": <string: clear business/technical reason why this is a highly lucrative pivot for this specific profile>,
    "requiredSkills": [
      <string: 3-4 specific tools, libraries, or methodologies needed to make this transition>
    ]
  },
  "skillsToAcquire": [
    {
      "skill": <string: name of crucial skill/tool needed to reach the salary ceiling>,
      "importance": <string: "CRITICAL" | "HIGH" | "MEDIUM">,
      "description": <string: one-sentence description of how this skill impacts their value>
    }
  ],
  "growthRoadmap": [
    {
      "milestone": <string: concrete milestone action to take>,
      "timeframe": <string: typical timeframe like "0-6 months", "6-12 months", "1-2 years">
    }
  ],
  "marketContext": <string: summary verdict (2-3 sentences) on the general job market climate for this role in the given country>
}
`;

  const result = await model.generateContent(prompt);
  let rawText = result.response.text().trim();

  // Clean markdown wrapping if present
  if (rawText.startsWith("```")) {
    rawText = rawText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
  }

  try {
    return JSON.parse(rawText);
  } catch (error) {
    console.error("Failed to parse Gemini response as JSON. Raw response was:\n", rawText);
    throw new Error("Invalid response format received from AI model.");
  }
}

module.exports = { analyzeCareer };
