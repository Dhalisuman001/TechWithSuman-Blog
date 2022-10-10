import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/userSlices";
import LoadingComponent from "../../../redux/utils/LoadingComponent";
import UsersListHeader from "./UserListHeader";

import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const dispatch = useDispatch()
  //data from store
  const users = useSelector(state => state?.users);
  const { userList, appErr, serverErr, loading,blocked,unblocked } = users;
   useEffect(()=>{
    dispatch(fetchUsersAction())
   },[dispatch,blocked,unblocked])
   
   return (
     <>
       <section className="py-8 bg-gray-900 min-h-screen">
         {loading ? (
           <LoadingComponent/>
         ) : appErr || serverErr ? (
           <h3 className="text-red-500 text-center text-lg">
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
 