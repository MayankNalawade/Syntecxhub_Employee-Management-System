const API_BASE = "/api/employees";

async function request(path = "", options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || "Request failed");
    error.details = payload.details;
    throw error;
  }
  return payload;
}

export function fetchEmployees(params = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, value]) => value))
  ).toString();
  return request(query ? `?${query}` : "");
}

export function createEmployee(body) {
  return request("", { method: "POST", body: JSON.stringify(body) });
}

export function updateEmployee(id, body) {
  return request(`/${id}`, { method: "PUT", body: JSON.stringify(body) });
}

export function deleteEmployee(id) {
  return request(`/${id}`, { method: "DELETE" });
}
