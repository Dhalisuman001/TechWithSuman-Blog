import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  //check if user is loggin
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  if (!userAuth?.isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
