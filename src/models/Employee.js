import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    department: {
      type: String,
      required: true,
      enum: ["Engineering", "Product", "Design", "HR", "Finance", "Sales", "Operations"],
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

employeeSchema.index({ name: "text", email: "text", role: "text" });

export const Employee = mongoose.model("Employee", employeeSchema);
