import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/login"
            replace
            state={{ from: window.location.pathname }}
        />
    );
};

export default PrivateRoute;
