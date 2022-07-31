import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useFirebaseUser } from "../context/UserContext";
import * as ROUTES from "../constants/index";

export const PublicRoutes = (props) => {
  const { user } = useFirebaseUser();
  return user ? <Navigate to={ROUTES.HOME} /> : <Outlet />;
};

export default PublicRoutes;
