import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "./api.js";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import { emptyForm, formatSalary } from "./validation.js";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchEmployees(filters);
      setEmployees(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(loadEmployees, 200);
    return () => clearTimeout(timer);
  }, [loadEmployees]);

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === "Active").length;
    const payroll = employees.reduce((sum, e) => sum + Number(e.salary || 0), 0);
    return { total, active, payroll };
  }, [employees]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(employee) {
    setEditing(employee);
    setModalOpen(true);
  }

  async function handleSave(values) {
    if (editing) {
      await updateEmployee(editing._id, values);
      setNotice(`${values.name} was updated`);
    } else {
      await createEmployee(values);
      setNotice(`${values.name} was added`);
    }
    setModalOpen(false);
    setEditing(null);
    await loadEmployees();
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    try {
      await deleteEmployee(pendingDelete._id);
      setNotice(`${pendingDelete.name} was removed`);
      setPendingDelete(null);
      await loadEmployees();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <header className="topbar">
        <div className="brand">
          <span className="logo">S</span>
          <div>
            <p className="brand-kicker">Syntecxhub · Project 3</p>
            <h1>Employee Management System</h1>
          </div>
        </div>
        <button className="btn primary" onClick={openCreate}>
          Add employee
        </button>
      </header>

      <section className="stats">
        <article>
          <p>Team size</p>
          <strong>{stats.total}</strong>
        </article>
        <article>
          <p>Active</p>
          <strong>{stats.active}</strong>
        </article>
        <article>
          <p>Shown payroll</p>
          <strong>{formatSalary(stats.payroll)}</strong>
        </article>
      </section>

      <section className="panel">
        <div className="toolbar">
          <input
            className="search"
            placeholder="Search name, email, or role"
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          />
          <select
            value={filters.department}
            onChange={(e) => setFilters((f) => ({ ...f, department: e.target.value }))}
          >
            <option value="">All departments</option>
            {["Engineering", "Product", "Design", "HR", "Finance", "Sales", "Operations"].map(
              (dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              )
            )}
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="">All statuses</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>

        {notice && (
          <p className="banner success" role="status">
            {notice}
            <button onClick={() => setNotice("")}>Dismiss</button>
          </p>
        )}
        {error && (
          <p className="banner danger" role="alert">
            {error}
            <button onClick={() => setError("")}>Dismiss</button>
          </p>
        )}

        <EmployeeTable
          employees={employees}
          loading={loading}
          onEdit={openEdit}
          onDelete={setPendingDelete}
        />
      </section>

      {modalOpen && (
        <EmployeeForm
          initialValues={editing || emptyForm}
          title={editing ? "Update employee" : "Add employee"}
          submitLabel={editing ? "Save changes" : "Create employee"}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSave}
        />
      )}

      {pendingDelete && (
        <div className="overlay" onClick={() => setPendingDelete(null)}>
          <div className="modal confirm" onClick={(e) => e.stopPropagation()}>
            <h2>Delete {pendingDelete.name}?</h2>
            <p>This removes the employee record from MongoDB. You cannot undo this action.</p>
            <div className="form-actions">
              <button className="btn ghost" onClick={() => setPendingDelete(null)}>
                Cancel
              </button>
              <button className="btn danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
