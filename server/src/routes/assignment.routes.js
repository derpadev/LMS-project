import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { createAssignment, getAssignments, getAssignmentById } from "../controllers/assignment.controller.js";

const router = express.Router();

router.post("/:classId/assignments", authMiddleware, roleMiddleware("teacher"), createAssignment);
router.get("/:classId/assignments", authMiddleware, getAssignments);
router.get("/assignments/:assignmentId", authMiddleware, getAssignmentById);

export default router