import Assignment from "../models/Assignment.js";
import Class from "../models/Class.js";

export const createAssignment = async (req, res) => {
  try {
    const classId = req.params.classId;
    const { title, description, dueDate, points } = req.body;

    // Validate Title and Class ref
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const classObj = await Class.findById(classId);

    if (!classObj) {
      return res.status(404).json({ message: "Class not found" });
    }

    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      points,
      class: classId,
    });

    res.status(201).json(assignment);
  } catch (err) {
    console.error("Create Assignment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const classId = req.params.classId;

    const assignments = await Assignment.find({ class: classId }).sort({
      createdAt: -1,
    });
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};

export const getAssignmentById = async (req, res) => {
  const assignmentId = req.params.assignmentId;
  try {
  const assignmentDoc = await Assignment.findById(assignmentId);
  if (!assignmentDoc) {
    return res.status(404).json({ message: "Assignment not found" });
  }
  res.json(assignmentDoc);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server error" });
}

};
