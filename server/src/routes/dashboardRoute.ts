import express from "express";
import { getLogs, getAllLogs } from "../controllers/dashboardController";

const router = express.Router();

router.get("/", getLogs);
router.get("/all", getAllLogs); 

export default router;
