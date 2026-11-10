import { Router } from "express";
import { body, param } from "express-validator";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  listEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";
import { handleValidation } from "../middleware/validate.js";

const router = Router();

const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "HR",
  "Finance",
  "Sales",
  "Operations",
];

const employeeRules = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must be between 2 and 80 characters"),
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("role")
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("Role must be between 2 and 60 characters"),
  body("department")
    .isIn(DEPARTMENTS)
    .withMessage("Select a valid department"),
  body("salary")
    .isFloat({ min: 0, max: 10_000_000 })
    .withMessage("Salary must be a number between 0 and 10,000,000")
    .toFloat(),
  body("phone")
    .trim()
    .matches(/^[0-9+\-\s()]{8,20}$/)
    .withMessage("Enter a valid phone number"),
  body("status")
    .optional()
    .isIn(["Active", "On Leave", "Inactive"])
    .withMessage("Select a valid status"),
];

const idRule = param("id").isMongoId().withMessage("Invalid employee id");

router.get("/", listEmployees);
router.get("/:id", idRule, handleValidation, getEmployee);
router.post("/", employeeRules, handleValidation, createEmployee);
router.put("/:id", idRule, employeeRules, handleValidation, updateEmployee);
router.delete("/:id", idRule, handleValidation, deleteEmployee);

export default router;
