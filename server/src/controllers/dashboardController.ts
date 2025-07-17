import { Request, Response } from "express";
import Log from "../models/logModel";

export const getLogs = async (req: Request, res: Response) => {
  try {
    const {
      startDate,
      endDate,
      client,
      country,
      page = "1",
      pageSize = "10",
      sortField = "timestamp",
      sortOrder = "desc",
    } = req.query;

    const filter: any = {};
    const sort: any = {};
    sort[sortField as string] = sortOrder === "asc" ? 1 : -1;


    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate as string);
      if (endDate) {
        const end = new Date(endDate as string);
        end.setHours(23, 59, 59, 999);
        filter.timestamp.$lte = end;
      }
    }

    if (client) {
      filter.transactionSourceName = {
        $regex: `^${client}$`,
        $options: "i",
      };
    }


    if (country) {
      filter.country_code = {
        $regex: new RegExp(country as string, "i"),
      };
    }

    const pageNum = parseInt(page as string, 10);
    const size = parseInt(pageSize as string, 10);

    const total = await Log.countDocuments(filter);

    const logs = await Log.find(filter)
      .sort(sort)
      .skip((pageNum - 1) * size)
      .limit(size);

    return res.json({ logs, total });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllLogs = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, client, country } = req.query;
    const filter: any = {};

    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate as string);
      if (endDate) {
        const end = new Date(endDate as string);
        end.setHours(23, 59, 59, 999);
        filter.timestamp.$lte = end;
      }
    }

    if (client) {
      filter.transactionSourceName = {
        $regex: `^${client}$`,
        $options: "i",
      };
    }

    if (country) {
      filter.country_code = {
        $regex: new RegExp(country as string, "i"),
      };
    }

    const logs = await Log.find(filter).sort({ timestamp: -1 });

    return res.json({ logs });
  } catch (error) {
    console.error("Error fetching all logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
