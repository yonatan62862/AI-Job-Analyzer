import { useState } from "react";
import { LineChart as LineChartIcon, Globe, AlertTriangle,  BarChartHorizontal, BarChart3 } from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { useMemo } from "react";
import type { Log } from "../types/types";

type DashboardChartsProps = {
  logs: Log[];
};

function DashboardCharts({ logs }: DashboardChartsProps) {
  const [topClientsCount, setTopClientsCount] = useState(20);

  const {
    jobsByClient,
    jobsByCountry,
    jobsOverTime,
    failureRates,
    averageJobsPerDay,
  } = useMemo(() => {
    const jobsByClient: Record<string, number> = {};
    const jobsByCountry: Record<string, number> = {};
    const jobsOverTime: Record<string, number> = {};
    const failureRates: { date: string; success: number; fail: number }[] = [];
    const dailyStats: Record<string, { total: number; count: number }> = {};

    logs.forEach((log) => {
      const client = log.transactionSourceName || "Unknown";
      const country = log.country_code || "Unknown";
      const date = new Date(log.timestamp).toISOString().split("T")[0];

      const sent = log.progress?.TOTAL_JOBS_SENT_TO_INDEX || 0;
      const fail = log.progress?.TOTAL_JOBS_FAIL_INDEXED || 0;

      jobsByClient[client] = (jobsByClient[client] || 0) + sent;
      jobsByCountry[country] = (jobsByCountry[country] || 0) + sent;
      jobsOverTime[date] = (jobsOverTime[date] || 0) + sent;

      const dayStats = dailyStats[date] || { total: 0, count: 0 };
      dailyStats[date] = {
        total: dayStats.total + sent,
        count: dayStats.count + 1,
      };

      const existing = failureRates.find((d) => d.date === date);
      if (existing) {
        existing.success += sent;
        existing.fail += fail;
      } else {
        failureRates.push({ date, success: sent, fail });
      }
    });

    const sortedClients = Object.entries(jobsByClient)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20);

    const averageJobsPerDay = Object.entries(dailyStats).map(([date, { total, count }]) => ({
      date,
      avg: Math.round(total / count),
    }));

    return {
      jobsByClient: sortedClients.map(([client, jobs]) => ({ client, jobs })),
      jobsByCountry: Object.entries(jobsByCountry).map(([country, jobs]) => ({ country, jobs })),
      jobsOverTime: Object.entries(jobsOverTime).map(([date, jobs]) => ({ date, jobs })),
      failureRates,
      averageJobsPerDay,
    };
  }, [logs]);


  return (
    <div className="space-y-12 my-6">
      <div className="p-4 border rounded bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChartHorizontal className="w-5 h-5 text-indigo-600" />

            Jobs Sent to Index per Client (Top {topClientsCount}):
          </h2>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={topClientsCount}
            onChange={(e) => setTopClientsCount(Number(e.target.value))}
          >
            <option value={10}>Top 10</option>
            <option value={20}>Top 20</option>
            <option value={50}>Top 50</option>
            <option value={100}>Top 100</option>
            <option value={9999}>All</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <div
            style={{
              minWidth: `${Math.max(topClientsCount * 60, 600)}px`,
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[...jobsByClient]
                  .sort((a, b) => b.jobs - a.jobs)
                  .slice(0, topClientsCount)}
                margin={{ top: 20, right: 30, left: 40, bottom: 15 }}

              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="client" angle={-30} textAnchor="end" interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jobs" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Jobs Sent to Index per Country:
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={jobsByCountry}
            margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jobs" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <LineChartIcon className="w-5 h-5 text-purple-600" />
          Jobs Over Time:
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={jobsOverTime}
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="jobs" stroke="#6366F1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          Failure Rate Over Time:
        </h2>        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={failureRates}
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="success" stroke="#16A34A" name="Successful Jobs" />
            <Line type="monotone" dataKey="fail" stroke="#DC2626" name="Failed Jobs" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-600" />
          Average Jobs Per Day:
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={averageJobsPerDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avg" fill="#0EA5E9" name="Avg Jobs" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCharts;