import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getSubmission, gradeSubmission, submitAssignment } from "../controllers/submission.controller.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/assignments/:assignmentId/submissions", authMiddleware, submitAssignment)
router.get("/assignments/:assignmentId/submissions", authMiddleware, getSubmission)
router.patch("/submissions/:submissionId/grade", authMiddleware, roleMiddleware("teacher"), gradeSubmission)

export default router