import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth || !auth.access) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;
