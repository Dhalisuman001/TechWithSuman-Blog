import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./admin/AdminNavbar";
import AccountVerificationAlertWarning from "./alert/VerificationAlert";
import AccountVerificationSuccessAlert from "./alert/VerificationSuccessAlert";

import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./public/PublicNavbar";

const Navbar = () => {
  const store = useSelector((state) => state.users);
  const verify = useSelector((state) => state.verification);
  const { userAuth } = store;
  const { loading,token,appErr,serverErr } = verify;
  const isAdmin = userAuth?.isAdmin;

  const Nav = () => {
    if (isAdmin) {
      return <><AdminNavbar />
       
       </>;
    } else if (userAuth) return <><PrivateNavbar /> 
    
       </>;
    else return <PublicNavbar />;
  };
  return <>{Nav()}
{!userAuth?.isVerified && userAuth && <AccountVerificationAlertWarning />}
       {loading && <h2 className="text-center">Loading...</h2>}
       {token && <AccountVerificationSuccessAlert/> }
       {serverErr || appErr ? <h2 className="text-center text-red-500">{serverErr} {appErr}</h2>: null}
  </>;
};

export default Navbar;
