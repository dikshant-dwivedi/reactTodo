import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useFirebaseUser } from "../context/UserContext";

export const PublicRoutes = (props) => {
  const { user } = useFirebaseUser();
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
