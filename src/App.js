import Home from "./component/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./component/user/Register/Register";
import Login from "./component/user/Login/Login";
import Navbar from "./component/navbar/Navbar";
import AddNewCategory from "./component/categories/AddNewCategeries";
import CategoryList from "./component/categories/CategoryList";
import UpdateCategory from "./component/categories/UpdateCategory";
import AdminRoute from "./component/navbar/private-route/AdminRoute";
import PrivateRoute from "./component/navbar/private-route/PrivateRoute";
import CreatePost from "./component/post/CreatePost";
import PostsList from "./component/post/PostList";
import PostDetails from "./component/post/PostDetails";
import UpdatePost from "./component/post/UpdatePost";
import UpdateComment from "./component/comments/UpdateComment";
import Profile from "./component/user/profile/Profile";
import UploadProfilePhoto from "./component/user/profile/UploadProfilePhoto";
import UpdateProfileForm from "./component/user/profile/UploadProfile";
import SendEmail from "./component/user/email/SendEmail";
import UsersList from "./component/user/user__list/UserList";
import UpdatePassword from "./component/user/password/PasswordForm";
import ResetPasswordForm from "./component/user/password/ResetPasswordForm";
import ResetForm from "./component/user/password/ResetPassword";
import AccountVerified from "./component/user/verification/AccountVerified";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/fetch-category"
          element={
            <AdminRoute>
              <CategoryList />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/update-category/:id"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/add-category"
          element={
            <AdminRoute>
              <AddNewCategory />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/users"
          element={
            <AdminRoute>
              <UsersList />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/update-post/:id"
          element={
            <PrivateRoute>
              <UpdatePost />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/update-comment/:id"
          element={
            <PrivateRoute>
              <UpdateComment />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/upload-profile-photo"
          element={
            <PrivateRoute>
              <UploadProfilePhoto />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/update-profile/:id"
          element={
            <PrivateRoute>
              <UpdateProfileForm />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/send-email/:id"
          element={
            <AdminRoute>
              <SendEmail />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/update-password"
          element={
            <PrivateRoute><UpdatePassword /></PrivateRoute>
              
            
          }
        />
        <Route
          exact
          path="/reset-password-token"
          element={
            
              <ResetPasswordForm/>
            
          }
        />
        <Route
          exact
          path="/reset-password/:token"
          element={
            
              <ResetForm/>
            
          }
        />
        <Route
          exact
          path="/verify-account/:token"
          element={
            
              <AccountVerified/>
            
          }
        />
        <Route exact path="/posts" element={<PostsList />} />
        <Route exact path="/posts/:id" element={<PostDetails />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
