import { Request, Response } from "express";
import Log from "../models/logModel";

export const getKpis = async (req: Request, res: Response) => {
  try {
    const [kpis] = await Log.aggregate([
      {
        $group: {
          _id: null,
          totalJobsSent: { $sum: "$progress.TOTAL_JOBS_SENT_TO_INDEX" },
          totalJobsFailed: { $sum: "$progress.TOTAL_JOBS_FAIL_INDEXED" },
          avgJobsPerClient: { $avg: "$progress.TOTAL_JOBS_SENT_TO_INDEX" },
          countries: { $addToSet: "$country_code" },
          latestTimestamp: { $max: "$timestamp" },
        },
      },
      {
        $project: {
          _id: 0,
          totalJobsSent: 1,
          totalJobsFailed: 1,
          avgJobsPerClient: { $round: ["$avgJobsPerClient", 0] },
          countriesCovered: { $size: "$countries" },
          latestTimestamp: 1,
        },
      },
    ]);

    res.json(kpis);
  } catch (error) {
    console.error("Error in KPI route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
