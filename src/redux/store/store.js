import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlices";
import categoriesReducer from "../slices/category/CategorySlice";
import postReducer from "../slices/posts/PostSlices";
import commentReducer from "../slices/comments/commentsSlices";
import emailReducer from '../slices/email/EmailSlices'
import verificationReducer from '../slices/account/AccountVerification'
const Store = configureStore({
  reducer: {
    users: userReducer,
    category: categoriesReducer,
    post: postReducer,
    comment: commentReducer,
    email:emailReducer,
    verification:verificationReducer
  },
});

export default Store;
