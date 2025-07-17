import express from "express";
import { handleAssistantQuestion } from "../controllers/assistantController";

const router = express.Router();

router.post("/", handleAssistantQuestion);

export default router;
