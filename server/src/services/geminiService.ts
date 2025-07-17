import { GoogleGenerativeAI } from "@google/generative-ai";
import { logAnalyzerPrompt } from "../prompts/logAnalyzerPrompt";

import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type GeminiResult = {
  response: string;
  query?: any;
};

export async function generateAnswerFromGemini(question: string): Promise<GeminiResult> {
  const prompt = logAnalyzerPrompt(question);


  try {
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
    const rawText = result.response.text().trim();

    const firstBrace = rawText.indexOf("{");
    const lastBrace = rawText.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error("Invalid JSON structure from LLM");
    }

    const jsonSubstring = rawText.slice(firstBrace, lastBrace + 1);
    const cleanedText = jsonSubstring.replace(/ISODate\([^)]*\)/g, "\"InvalidDate\"");

    const parsed: GeminiResult = JSON.parse(cleanedText);
    return parsed;
  } catch (error: any) {
    console.error("Gemini error:", error.message);
    return {
      response: "⚠️ An error occurred while contacting Gemini.",
    };
  }
}
