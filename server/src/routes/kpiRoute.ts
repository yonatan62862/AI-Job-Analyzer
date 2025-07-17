import express from "express";
import { getKpis } from "../controllers/kpiController";

const router = express.Router();

router.get("/", getKpis);

export default router;
