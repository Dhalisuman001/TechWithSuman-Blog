import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/userSlices";
import UsersListHeader from "./UserListHeader";

import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const dispatch = useDispatch()
   useEffect(()=>{
    dispatch(fetchUsersAction())
   },[dispatch])
   //data from store
   const users = useSelector(state => state?.users);
   const { userList, appErr, serverErr, loading } = users;
   return (
     <>
       <section className="py-8 bg-gray-900 min-h-screen">
         {loading ? (
           <h1>Loading</h1>
         ) : appErr || serverErr ? (
           <h3>
             {serverErr} {appErr}
           </h3>
         ) : userList?.length <= 0 ? (
           <h2>No User Found</h2>
         ) : (
           userList?.map(user => (
             <>
               <UsersListItem user={user} />
             </>
           ))
         )}
       </section>
     </>
   );
 };
 
 export default UsersList;
 