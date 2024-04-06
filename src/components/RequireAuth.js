import React, { useContext } from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../Contexts/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const { isLogged } = useContext(AuthContext);
    const location = useLocation();

    return allowedRoles?.includes(auth?.role) && isLogged ? (
        <Outlet />
    ) : isLogged ? (
        <Navigate to="/nieuprawniony" state={{ from: location }} replace />
    ) : (
        <Navigate to="/logowanie" state={{ from: location }} replace />
    );
};

export default RequireAuth;
