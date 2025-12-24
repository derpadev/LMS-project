import express from "express";
import { createClass, getClassById, getMyClasses, joinClass } from "../controllers/class.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("teacher"), createClass);
router.get("/", authMiddleware, getMyClasses)
router.post("/join", authMiddleware, joinClass)
// "If I receive GET req whose path matches /something, capture that something and call it id"
// Express does this internally: req.params = { id: "64f9c1e8a1b23a9e2f8c1234" };
router.get("/:id", authMiddleware, getClassById)

export default router;
