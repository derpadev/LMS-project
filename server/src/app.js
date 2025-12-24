import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import classRoutes from "./routes/class.routes.js";
import assignmentRoutes from "./routes/assignment.routes.js"
import submissionRoutes from "./routes/submission.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LMS Backend Running");
});
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/classes", assignmentRoutes);
app.use("/api", submissionRoutes)

export default app;
