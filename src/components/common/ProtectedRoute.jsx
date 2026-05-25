import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const { warning } = useToast();

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (!isAuthenticated) {
        warning("Please login to access this page");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
