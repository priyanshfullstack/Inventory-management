import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const hasPermission = (userRole, requiredRole) => {
  return userRole === requiredRole; 
};

const PrivateRoute = ({ requiredRole }) => {
  const { currentUser, role } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !hasPermission(role, requiredRole)) {
    return <Navigate to="/" />; 
  }

  return <Outlet />; 
};

export default PrivateRoute;
