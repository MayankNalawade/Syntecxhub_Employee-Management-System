import dotenv from "dotenv";
import { connectDb, disconnectDb } from "./db.js";
import { Employee } from "./models/Employee.js";

dotenv.config();

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

async function seed() {
  await connectDb();
  await Employee.deleteMany({});
  await Employee.insertMany(seedEmployees);
  console.log(`Seeded ${seedEmployees.length} employees`);
  await disconnectDb();
}

seed().catch(async (error) => {
  console.error(error);
  await disconnectDb();
  process.exit(1);
});
