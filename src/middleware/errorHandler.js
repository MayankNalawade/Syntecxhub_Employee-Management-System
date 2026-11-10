export function notFound(_req, res) {
  res.status(404).json({ message: "Route not found" });
}

export function errorHandler(err, _req, res, _next) {
  if (err.code === 11000) {
    return res.status(409).json({ message: "An employee with this email already exists" });
  }

  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: "Validation failed", details });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid employee id" });
  }

  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
}
