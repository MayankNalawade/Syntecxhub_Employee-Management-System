import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { connectDb } from "./db.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import employeeRoutes from "./routes/employees.js";
import { Employee } from "./models/Employee.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5001;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "employee-management-system" });
});

app.use("/api/employees", employeeRoutes);
app.use(notFound);
app.use(errorHandler);

const seedEmployees = [
  {
    name: "Aisha Rahman",
    email: "aisha.rahman@syntecxhub.dev",
    role: "Frontend Engineer",
    department: "Engineering",
    salary: 92000,
    phone: "+1 415 555 0142",
    status: "Active",
  },
  {
    name: "Mayank Nalawade",
    email: "mayank.nalawade@syntecxhub.dev",
    role: "Full-Stack Developer",
    department: "Engineering",
    salary: 88000,
    phone: "+91 98765 43210",
    status: "Active",
  },
  {
    name: "Priya Desai",
    email: "priya.desai@syntecxhub.dev",
    role: "Product Manager",
    department: "Product",
    salary: 110000,
    phone: "+91 98200 11223",
    status: "Active",
  },
  {
    name: "Jordan Lee",
    email: "jordan.lee@syntecxhub.dev",
    role: "UX Designer",
    department: "Design",
    salary: 84000,
    phone: "+1 646 555 0199",
    status: "On Leave",
  },
  {
    name: "Sofia Alvarez",
    email: "sofia.alvarez@syntecxhub.dev",
    role: "People Partner",
    department: "HR",
    salary: 76000,
    phone: "+1 312 555 0177",
    status: "Active",
  },
];

async function start() {
  await connectDb();

  if (process.env.USE_MEMORY_DB === "true") {
    const count = await Employee.countDocuments();
    if (count === 0) {
      await Employee.insertMany(seedEmployees);
      console.log("Loaded sample employees");
    }
  }

  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
