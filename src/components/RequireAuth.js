import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = (allowedRoles) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.role?.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to="/nieuprawniony" state={{ from: location }} replace />
    ) : (
        <Navigate to="/logowanie" state={{ from: location }} replace />
    );
};

export default RequireAuth;
