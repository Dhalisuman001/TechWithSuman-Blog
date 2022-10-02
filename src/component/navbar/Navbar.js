import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./admin/AdminNavbar";

import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./public/PublicNavbar";

const Navbar = () => {
  const store = useSelector((state) => state.users);
  const { userAuth } = store;
  const isAdmin = userAuth?.isAdmin;

  const Nav = () => {
    if (isAdmin) {
      return <AdminNavbar />;
    } else if (userAuth) return <PrivateNavbar />;
    else return <PublicNavbar />;
  };
  return <>{Nav()}</>;
};

export default Navbar;
