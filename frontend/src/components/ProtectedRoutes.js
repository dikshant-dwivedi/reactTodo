import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useFirebaseUser } from "../context/UserContext";

export const ProtectedRoutes = () => {
  const { user } = useFirebaseUser();
  return user ? <Outlet /> : <Navigate to="/signin" />;
};
