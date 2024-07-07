import React from "react";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoutes({ children }) {
  let token = Cookies.get("tokens");
  let username = Cookies.get("username");
  const location = useLocation();

  if (!token && !username) {
    return <Navigate to="/login" state={location.pathname} replace={true} />;
  }

  return children;
}
