import { formatSalary } from "../validation.js";

export default function EmployeeTable({ employees, loading, onEdit, onDelete }) {
  if (loading) {
    return <p className="empty">Loading employees...</p>;
  }

  if (!employees.length) {
    return <p className="empty">No employees match these filters. Add one to get started.</p>;
  }

  return (
    <>
      <div className="table-wrap desktop-only">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  <div className="person">
                    <span className="avatar">{initials(employee.name)}</span>
                    <div>
                      <strong>{employee.name}</strong>
                      <p>{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  {employee.role}
                  <p className="muted">{employee.phone}</p>
                </td>
                <td>{employee.department}</td>
                <td>{formatSalary(employee.salary)}</td>
                <td>
                  <span className={`pill ${slug(employee.status)}`}>{employee.status}</span>
                </td>
                <td className="actions">
                  <button className="btn ghost" onClick={() => onEdit(employee)}>
                    Edit
                  </button>
                  <button className="btn danger-ghost" onClick={() => onDelete(employee)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cards mobile-only">
        {employees.map((employee) => (
          <article className="card" key={employee._id}>
            <div className="person">
              <span className="avatar">{initials(employee.name)}</span>
              <div>
                <strong>{employee.name}</strong>
                <p>{employee.email}</p>
              </div>
              <span className={`pill ${slug(employee.status)}`}>{employee.status}</span>
            </div>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{employee.role}</dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>{employee.department}</dd>
              </div>
              <div>
                <dt>Salary</dt>
                <dd>{formatSalary(employee.salary)}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{employee.phone}</dd>
              </div>
            </dl>
            <div className="actions">
              <button className="btn ghost" onClick={() => onEdit(employee)}>
                Edit
              </button>
              <button className="btn danger-ghost" onClick={() => onDelete(employee)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function slug(value) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
