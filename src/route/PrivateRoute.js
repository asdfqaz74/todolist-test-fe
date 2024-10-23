import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

// user 값이 있으면? TodaPage 렌더링

export default PrivateRoute;
