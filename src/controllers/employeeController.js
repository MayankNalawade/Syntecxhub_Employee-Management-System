import { Employee } from "../models/Employee.js";

export async function listEmployees(req, res, next) {
  try {
    const { search = "", department, status, sort = "createdAt:desc" } = req.query;
    const filter = {};

    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [{ name: regex }, { email: regex }, { role: regex }];
    }

    if (department) {
      filter.department = department;
    }

    if (status) {
      filter.status = status;
    }

    const [sortField, sortDir] = String(sort).split(":");
    const sortSpec = { [sortField || "createdAt"]: sortDir === "asc" ? 1 : -1 };

    const employees = await Employee.find(filter).sort(sortSpec);
    res.json({ data: employees, count: employees.length });
  } catch (error) {
    next(error);
  }
}

export async function getEmployee(req, res, next) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ data: employee });
  } catch (error) {
    next(error);
  }
}

export async function createEmployee(req, res, next) {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ data: employee });
  } catch (error) {
    next(error);
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ data: employee });
  } catch (error) {
    next(error);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted", data: employee });
  } catch (error) {
    next(error);
  }
}
