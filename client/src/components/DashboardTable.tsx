import type { Log } from "../types";

type Props = {
  logs: Log[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onSort: (field: string) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
};

function DashboardTable({
  logs,
  loading,
  currentPage,
  pageSize,
  total,
  onPageChange,
  onSort,
  sortField,
  sortOrder,
}: Props) {
  const totalPages = Math.ceil(total / pageSize);

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return "↕️";
    return sortOrder === "asc" ? "🔼" : "🔽";
  };

  return (
    <div className="mt-6">
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left cursor-pointer" onClick={() => onSort("transactionSourceName")}>
                    Client {renderSortIcon("transactionSourceName")}
                  </th>
                  <th className="p-3 text-left cursor-pointer" onClick={() => onSort("country_code")}>
                    Country {renderSortIcon("country_code")}
                  </th>
                  <th className="p-3 text-left cursor-pointer" onClick={() => onSort("timestamp")}>
                    Timestamp {renderSortIcon("timestamp")}
                  </th>
                  <th className="p-3 text-left">Sent to Index</th>
                  <th className="p-3 text-left">Failed Index</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, idx) => (
                  <tr key={log._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3">{log.transactionSourceName}</td>
                    <td className="p-3">{log.country_code}</td>
                    <td className="p-3">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="p-3">{log.progress?.TOTAL_JOBS_SENT_TO_INDEX ?? "-"}</td>
                    <td className="p-3">{log.progress?.TOTAL_JOBS_FAIL_INDEXED ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-blue-200 text-sm rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-blue-200 text-sm rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardTable;