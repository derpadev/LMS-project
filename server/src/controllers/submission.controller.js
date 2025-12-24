import Submission from "../models/Submission.js";

export const submitAssignment = async (req, res) => {
  try {
    const { content } = req.body;
    const { assignmentId } = req.params;

    let submission = await Submission.findOne({
      assignment: assignmentId,
      student: req.user.id,
    });

    if (submission) {
      // resubmit
      submission.content = content;
      submission.submittedAt = new Date();
      await submission.save();
    } else {
      // new submission
      submission = await Submission.create({
        assignment: assignmentId,
        student: req.user.id,
        content,
        submittedAt: new Date(),
      });
    }
    res.json(submission);
  } catch (err) {
    console.error("Error submitting assignment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubmission = async (req, res) => {
  const { assignmentId } = req.params;
  const userId = req.user.id;
  const role = req.user.role;

  try {
    let submissions;

    if (role === "teacher") {
      // Return all submissions for this assignment
      submissions = await Submission.find({
        assignment: assignmentId,
      }).populate("student", "name email");
    } else {
      // Return only the student's own submission
      submissions = await Submission.findOne({
        assignment: assignmentId,
        student: userId,
      }).populate("student", "name email");
    }

    res.json(submissions || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching submission" });
  }
};

export const gradeSubmission = async (req, res) => {
  const { submissionId } = req.params;
  const { grade } = req.body;
  try {
    let submission = await Submission.findById(submissionId);

    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    submission.grade = grade;
    await submission.save();
    
    submission = await submission.populate("student", "name email");

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
