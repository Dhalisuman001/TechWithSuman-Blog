import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //check if user is loggin
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  if (!userAuth) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
