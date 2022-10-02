import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlices";
import categoriesReducer from "../slices/category/CategorySlice";
import postReducer from "../slices/posts/PostSlices";
import commentReducer from "../slices/comments/commentsSlices";
const Store = configureStore({
  reducer: {
    users: userReducer,
    category: categoriesReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

export default Store;
