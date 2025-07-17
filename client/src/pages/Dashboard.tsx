import { useEffect, useState } from "react";
import FiltersBar from "../components/FiltersBar";
import DashboardTable from "../components/DashboardTable";
import KpiCards from "../components/KpiCards";
import DashboardCharts from "../components/DashboardCharts";
import type { Log } from "../types";
import { getLogs } from "../services/logService";
import { BarChart3, Table, LineChart } from "lucide-react";

function Dashboard() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [allLogs, setAllLogs] = useState<Log[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    client: "",
    country: "",
    from: "",
    to: "",
  });
  const pageSize = 20;
  const [sortField, setSortField] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");


  const fetchLogs = async (
    page = 1,
    filtersParam = filters,
    sortFieldParam = sortField,
    sortOrderParam = sortOrder
  ) => {
    setLoading(true);
    const data = await getLogs(page, pageSize, filtersParam, sortFieldParam, sortOrderParam);
    setLogs(data.logs);
    setTotal(data.total);
    setLoading(false);
  };

  const fetchAllLogs = async (filtersParam = filters) => {
    const params = new URLSearchParams();

    if (filtersParam.client) params.append("client", filtersParam.client);
    if (filtersParam.country) params.append("country", filtersParam.country);
    if (filtersParam.from) params.append("startDate", filtersParam.from);
    if (filtersParam.to) params.append("endDate", filtersParam.to);

    const res = await fetch(`http://localhost:4000/api/dashboard/all?${params}`);
    const data = await res.json();
    setAllLogs(data.logs);
  };

  useEffect(() => {
    fetchLogs(currentPage, filters, sortField, sortOrder);
    fetchAllLogs(filters);
  }, [currentPage, filters, sortField, sortOrder]);


  const handleFilter = (newFilters: {
    client: string;
    country: string;
    from: string;
    to: string;
  }) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };


  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight animate-fade-in flex items-center justify-center gap-2">
            <BarChart3 className="w-7 h-7 text-blue-600" />
            AI Job Skill Analyzer
          </h1>
          <p className="text-gray-600 text-lg">
            Monitor indexing performance, trends & insights across clients
          </p>
        </div>

        <div className="animate-slide-up flex justify-center">
          <FiltersBar onFilterChange={handleFilter} />
        </div>



        <div className="bg-white rounded-xl shadow-xl p-6 animate-fade-in-slow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Table className="w-5 h-5 text-gray-700" />
            Logs Table
          </h2>
          <DashboardTable
            logs={logs}
            loading={loading}
            currentPage={currentPage}
            pageSize={pageSize}
            total={total}
            onPageChange={setCurrentPage}
            onSort={handleSort}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        </div>

        <div className="animate-fade-in-slow flex justify-center">
          <KpiCards logs={logs} />
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 animate-slide-up-slow">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center justify-center gap-2">
            <LineChart className="w-5 h-5 text-indigo-700" />
            Visual Insights
          </h2>

          <DashboardCharts logs={allLogs} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;