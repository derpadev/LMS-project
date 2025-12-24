import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    // User not logged in → redirect to login
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role → redirect to their dashboard
    return <Navigate to={user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"} />;
  }

  // Logged in and has correct role → render children
  return children;
};

export default ProtectedRoute;
