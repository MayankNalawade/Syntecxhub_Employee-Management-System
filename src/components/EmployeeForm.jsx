import { useState } from "react";
import { DEPARTMENTS, STATUSES, validateEmployee } from "../validation.js";

export default function EmployeeForm({
  initialValues,
  title,
  submitLabel,
  onClose,
  onSubmit,
}) {
  const [values, setValues] = useState({
    name: initialValues.name || "",
    email: initialValues.email || "",
    role: initialValues.role || "",
    department: initialValues.department || "Engineering",
    salary: initialValues.salary ?? "",
    phone: initialValues.phone || "",
    status: initialValues.status || "Active",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateEmployee(values);
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    try {
      await onSubmit({
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        role: values.role.trim(),
        phone: values.phone.trim(),
        salary: Number(values.salary),
      });
    } catch (error) {
      if (Array.isArray(error.details)) {
        const mapped = {};
        error.details.forEach((detail) => {
          if (detail.field) mapped[detail.field] = detail.msg;
        });
        if (Object.keys(mapped).length) {
          setErrors(mapped);
        } else {
          setServerError(error.message);
        }
      } else {
        setServerError(error.message);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} noValidate>
        <div className="modal-head">
          <div>
            <p className="eyebrow">Employee record</p>
            <h2>{title}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {serverError && <p className="banner danger">{serverError}</p>}

        <div className="grid">
          <Field label="Full name" error={errors.name}>
            <input
              value={values.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Aisha Rahman"
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={values.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="name@company.com"
            />
          </Field>
          <Field label="Role" error={errors.role}>
            <input
              value={values.role}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder="Frontend Engineer"
            />
          </Field>
          <Field label="Department" error={errors.department}>
            <select
              value={values.department}
              onChange={(e) => updateField("department", e.target.value)}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept}>{dept}</option>
              ))}
            </select>
          </Field>
          <Field label="Salary (USD)" error={errors.salary}>
            <input
              type="number"
              min="0"
              step="100"
              value={values.salary}
              onChange={(e) => updateField("salary", e.target.value)}
              placeholder="88000"
            />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input
              value={values.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+91 98765 43210"
            />
          </Field>
          <Field label="Status" error={errors.status}>
            <select value={values.status} onChange={(e) => updateField("status", e.target.value)}>
              {STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn primary" disabled={saving}>
            {saving ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className={`field ${error ? "invalid" : ""}`}>
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  );
}
