import { BarChart3, AlertTriangle, List, Gauge } from "lucide-react";
import type { Log } from "../types";

type Props = {
  logs: Log[];
};

function KpiCards({ logs }: Props) {
  const jobsSent = logs.reduce(
    (sum, log) => sum + (log.progress?.TOTAL_JOBS_SENT_TO_INDEX || 0),
    0
  );
  const jobsFailed = logs.reduce(
    (sum, log) => sum + (log.progress?.TOTAL_JOBS_FAIL_INDEXED || 0),
    0
  );
  const totalLogs = logs.length;
  const avgJobs = totalLogs > 0 ? Math.round(jobsSent / totalLogs) : 0;

  const cards = [
    {
      label: "Jobs Sent to Index",
      value: jobsSent,
      icon: <BarChart3 size={20} />,
    },
    {
      label: "Jobs Failed Index",
      value: jobsFailed,
      icon: <AlertTriangle size={20} />,
    },
    {
      label: "Total Logs",
      value: totalLogs,
      icon: <List size={20} />,
    },
    {
      label: "Avg Jobs per Log",
      value: avgJobs,
      icon: <Gauge size={20} />,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 py-6">
      {cards.map(({ label, value, icon }) => (
        <div
          key={label}
          className="flex items-center gap-4 bg-white hover:shadow-lg transition-shadow rounded-xl px-6 py-4 border border-gray-200 min-w-[220px]"
        >
          <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
            {icon}
          </div>
          <div>
            <div className="text-gray-500 text-sm">{label}</div>
            <div className="text-xl font-bold text-gray-900">
              {value.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KpiCards;
