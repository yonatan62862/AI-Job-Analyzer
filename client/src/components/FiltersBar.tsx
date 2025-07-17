import { useState } from "react";

type Props = {
  onFilterChange: (filters: {
    client: string;
    country: string;
    from: string;
    to: string;
  }) => void;
};

function FiltersBar({ onFilterChange }: Props) {
  const [client, setClient] = useState("");
  const [country, setCountry] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const applyFilters = () => {
    if (from && to && new Date(from) > new Date(to)) {
      alert("'From' date must be before 'To' date.");
      return;
    }

    onFilterChange({ client, country, from, to });
  };

  const clearFilters = () => {
    setClient("");
    setCountry("");
    setFrom("");
    setTo("");
    onFilterChange({ client: "", country: "", from: "", to: "" });
  };

return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      applyFilters();
    }}
    className="flex flex-wrap items-end gap-4 p-6 bg-white rounded-xl shadow-lg mb-8 border border-gray-200"
  >
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Client</label>
      <input
        type="text"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="e.g. Deal4"
        className="w-44 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Country</label>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="e.g. US"
        className="w-44 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">From</label>
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">To</label>
      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="flex gap-2 ml-auto">
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
      >
        Apply
      </button>
      <button
        type="button"
        onClick={clearFilters}
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-200 transition"
      >
        Clear
      </button>
    </div>
  </form>
);

}

export default FiltersBar;
