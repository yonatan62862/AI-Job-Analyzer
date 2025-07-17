// import { useMemo } from "react";
// import { Log } from "../types";

// export function useDashboardAggregations(logs: Log[]) {
//   return useMemo(() => {
//     const jobsByClient: Record<string, number> = {};
//     const jobsByCountry: Record<string, number> = {};
//     const jobsOverTime: Record<string, number> = {};
//     const failureRates: { date: string; success: number; fail: number }[] = [];
//     const dailyStats: Record<string, { total: number; count: number }> = {};

//     logs.forEach((log) => {
//       const client = log.transactionSourceName || "Unknown";
//       const country = log.country_code || "Unknown";
//       const date = new Date(log.timestamp).toISOString().split("T")[0];

//       const sent = log.progress?.TOTAL_JOBS_SENT_TO_INDEX || 0;
//       const fail = log.progress?.TOTAL_JOBS_FAIL_INDEXED || 0;

//       jobsByClient[client] = (jobsByClient[client] || 0) + sent;
//       jobsByCountry[country] = (jobsByCountry[country] || 0) + sent;
//       jobsOverTime[date] = (jobsOverTime[date] || 0) + sent;

//       const dayStats = dailyStats[date] || { total: 0, count: 0 };
//       dailyStats[date] = {
//         total: dayStats.total + sent,
//         count: dayStats.count + 1,
//       };

//       const existing = failureRates.find((d) => d.date === date);
//       if (existing) {
//         existing.success += sent;
//         existing.fail += fail;
//       } else {
//         failureRates.push({ date, success: sent, fail });
//       }
//     });

//     const averageJobsPerDay = Object.entries(dailyStats).map(([date, { total, count }]) => ({
//       date,
//       avg: Math.round(total / count),
//     }));

//     return {
//       jobsByClient: Object.entries(jobsByClient).map(([client, jobs]) => ({ client, jobs })),
//       jobsByCountry: Object.entries(jobsByCountry).map(([country, jobs]) => ({ country, jobs })),
//       jobsOverTime: Object.entries(jobsOverTime).map(([date, jobs]) => ({ date, jobs })),
//       failureRates,
//       averageJobsPerDay,
//     };
//   }, [logs]);
// }
