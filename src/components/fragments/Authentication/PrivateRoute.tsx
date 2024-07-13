import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface PrivateRouteProps {
    children: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { token, isTokenExpired } = useAuth();

    return token && !isTokenExpired() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
