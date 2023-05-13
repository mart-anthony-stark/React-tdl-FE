import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuthContext();
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/auth/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
