export const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "HR",
  "Finance",
  "Sales",
  "Operations",
];

export const STATUSES = ["Active", "On Leave", "Inactive"];

export const emptyForm = {
  name: "",
  email: "",
  role: "",
  department: "Engineering",
  salary: "",
  phone: "",
  status: "Active",
};

export function validateEmployee(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email";
  }

  if (!values.role.trim()) {
    errors.role = "Role is required";
  } else if (values.role.trim().length < 2) {
    errors.role = "Role must be at least 2 characters";
  }

  if (!DEPARTMENTS.includes(values.department)) {
    errors.department = "Select a department";
  }

  const salary = Number(values.salary);
  if (values.salary === "" || Number.isNaN(salary)) {
    errors.salary = "Salary is required";
  } else if (salary < 0) {
    errors.salary = "Salary cannot be negative";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^[0-9+\-\s()]{8,20}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }

  if (!STATUSES.includes(values.status)) {
    errors.status = "Select a status";
  }

  return errors;
}

export function formatSalary(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}
