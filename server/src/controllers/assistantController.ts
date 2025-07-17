import { Request, Response } from "express";
import Log from "../models/logModel";
import { generateAnswerFromGemini } from "../services/geminiService";

export const handleAssistantQuestion = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    if (!question)
      return res.status(400).json({ error: "Question is required." });

    const llmResult = await generateAnswerFromGemini(question);

    if (!llmResult || typeof llmResult.response !== "string") {
      return res.status(500).json({ error: "Invalid LLM response format." });
    }

    if (llmResult.query && Array.isArray(llmResult.query)) {
      try {
        const result = await Log.aggregate(llmResult.query);
        return res.json({ answer: llmResult.response, data: result });
      } catch (aggErr) {
        console.error("Aggregation error:", aggErr);
        return res.status(500).json({ error: "Invalid aggregation pipeline." });
      }
    }

    return res.json({ answer: llmResult.response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
