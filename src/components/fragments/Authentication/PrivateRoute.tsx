import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
