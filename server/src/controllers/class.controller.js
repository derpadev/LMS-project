import Class from "../models/Class.js";
import { generateJoinCode } from "../utils/generateJoinCode.js";

export const createClass = async (req, res) => {
  try {
    const { name, description } = req.body;
    const teacherId = req.user._id;

    const joinCode = generateJoinCode();

    const newClass = await Class.create({
      name,
      description,
      teacher: teacherId,
      students: [],
      joinCode,
    });

    res.status(201).json(newClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create class" });
  }
};

export const getMyClasses = async (req, res) => {
  try {
    let classes;

    // Get teacher classes
    if (req.user.role === "teacher") {
      classes = await Class.find({ teacher: req.user._id })
        .populate("students", "name email")
        .sort({ createdAt: -1 });
    } else {
      // Get student classes
      classes = await Class.find({ students: req.user._id })
        .populate("teacher", "name email")
        .sort({ createdAt: -1 });
    }
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};

export const joinClass = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user._id;

    // Find class by join code
    const foundClass = await Class.findOne({ joinCode: code });
    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if user already in class
    if (foundClass.students.includes(userId)) {
      return res.status(400).json({ message: "You are already in this class" });
    }

    // Add user to class
    foundClass.students.push(userId);
    await foundClass.save();

    res
      .status(200)
      .json({ message: "Joined class successfully", name: foundClass.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to join class" });
  }
};

export const getClassById = async (req, res) => {
  const classId = req.params.id;
  const userId = req.user.id;

  const classDoc = await Class.findById(classId)
    .populate("teacher", "name email")
    .populate("students", "name email");

  if (!classDoc) {
    return res.status(404).json({ message: "Class not found" });
  }

  const isTeacher = classDoc.teacher._id.toString() === userId;
  const isStudent = classDoc.students.some(
    (s) => s._id.toString() === userId
  );

  if (!isTeacher && !isStudent) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(classDoc);
};
