// components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // If token is not found, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the route's children
  return <Outlet />;
};

export default ProtectedRoute;