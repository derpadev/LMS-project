import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { StudentDashboard } from "./pages/dashboard/StudentDashboard";
import { TeacherDashboard } from "./pages/dashboard/TeacherDashboard";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { ClassPage } from "./pages/class/ClassPage";
import { SubmitAssignment } from "./pages/assignment/SubmitAssignment";
import { GradeSubmission } from "./pages/assignment/GradeSubmission";

function App() {
  return (
    <Routes>
      <Route element={<Register />} path="/register" />
      <Route element={<Login />} path="/login" />
      <Route
        path="/classes/:classId"
        element={
          <ProtectedRoute>
            <ClassPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/classes/:classId/assignments/:assignmentId"
        element={<SubmitAssignment />}
      />

      {/* Only Teacher */}
      <Route
        path="/dashboard/teacher"
        element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* Only Teacher */}
      <Route
        path="/classes/:classId/submissions"
        element={
          <ProtectedRoute role="teacher">
            <GradeSubmission/>
          </ProtectedRoute>
        }
      />

      {/* Only Student */}
      <Route
        path="/dashboard/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
