import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    dueDate: Date,
    points: Number,
    class: {
        type: mongoose.Schema.ObjectId,
        ref: "Class",
        required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);
