import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

/* -------------------- Gemini Setup -------------------- */
const GEMINI_KEY = process.env.GEMINI_KEY || process.env.gemini_key;
if (!GEMINI_KEY) {
  console.error("⚠️  Warning: GEMINI_KEY not found in environment variables");
}
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `
    You are an AI business consultant focused on sustainability. 
    Your goal is to:
    1. Analyze the input metrics.
    2. Give a numeric eco-friendliness score (0-100).
    3. Suggest practical, cost-effective, and labor-friendly ways to make the business/product more eco-friendly.
    4. Be enthusiastic, clear, and brutally honest; do not leave suggestions vague or open-ended.
  `
});

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- Health Check -------------------- */
app.get("/", (req, res) => {
  res.json({ status: "Server is running 🚀" });
});

/* -------------------- AI Endpoint -------------------- */
app.post("/api/ai", async (req, res) => {
  try {
    const {
      text,
      paperUsage,
      cloudSpending,
      remotePercent,
      disposableCost,
      electricityUsage,
      wasteVolume
    } = req.body;

    if (!text || paperUsage == null || cloudSpending == null || remotePercent == null || 
        disposableCost == null || electricityUsage == null || wasteVolume == null) {
      return res.status(400).json({ error: "All business metrics are required" });
    }

    // Build the prompt for AI
    const prompt = `
      Business Idea: ${text}
      Paper Usage (reams): ${paperUsage}
      Cloud Spending ($): ${cloudSpending}
      Percent Remote: ${remotePercent}%
      Disposable Items Cost ($): ${disposableCost}
      Electricity Usage (kWh): ${electricityUsage}
      Total Waste Volume (kg): ${wasteVolume}

      Based on these inputs, provide a detailed sustainability report.
      Start the response STRICTLY with the score in this format:
      "Score: [0-100]/100"

      Then, provide sections for:
      ## Executive Summary
      ## Detailed Analysis
      ## Actionable Recommendations (prioritized list)
      ## Estimated Savings
    `;

    // Call Gemini AI
    if (!GEMINI_KEY) {
      return res.status(500).json({
        error: "AI service not configured. Please set GEMINI_KEY environment variable."
      });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    res.json({
      reply: aiText
    });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({
      error: "Something went wrong with the AI request",
      details: error.message
    });
  }
});

/* -------------------- Start Server -------------------- */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
