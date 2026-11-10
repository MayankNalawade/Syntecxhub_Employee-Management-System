import { validationResult } from "express-validator";

export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    message: "Validation failed",
    details: errors.array().map((error) => ({
      field: error.path,
      msg: error.msg,
    })),
  });
}
