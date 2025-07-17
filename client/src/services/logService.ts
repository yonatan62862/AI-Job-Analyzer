export const getLogs = async (
  page: number,
  pageSize: number,
  filters: { client: string; country: string; from: string; to: string },
  sortField?: string,
  sortOrder?: "asc" | "desc"
) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (filters.client) params.append("client", filters.client);
  if (filters.country) params.append("country", filters.country);
  if (filters.from) params.append("startDate", filters.from);
  if (filters.to) params.append("endDate", filters.to);

  if (sortField) params.append("sortField", sortField);
  if (sortOrder) params.append("sortOrder", sortOrder);

  const res = await fetch(`http://localhost:4000/api/dashboard?${params}`);
  const data = await res.json();
  return data;
};
