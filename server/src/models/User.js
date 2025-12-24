import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true, enum: ["student", "teacher"] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
