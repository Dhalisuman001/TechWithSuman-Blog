import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";


//reset user update action
const resetUserUpdateAction = createAction('reset/update/user');

//register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call register api
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BaseUrl}/api/v1/users/register`,
        user,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//update user action
export const updateUserAction = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call register api
      const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
      const { data } = await axios.put(
        `${BaseUrl}/api/v1/users/profile`,
        {
          firstname:userData?.firstname,
          lastnamename:userData?.lastnamename,
          email:userData?.email,
          bio:userData?.bio,
        },
        config
      );
   dispatch(resetUserUpdateAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call register api
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BaseUrl}/api/v1/users/login`,
        user,
        config
      );
      //save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//logout action
export const logoutUserAction = createAsyncThunk(
  "user/logouts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// fetch users details
export const fetchUserDetailsAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    ///http
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${BaseUrl}/api/v1/users/profile/${id}`,

        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//upload profile photo action
export const uploadPhotoAction = createAsyncThunk(
  "profile-photo/upload",
  async (userImg, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append("image", userImg?.image);
      const { data } = await axios.put(
        `${BaseUrl}/api/v1/users/profile-photo-upload`,
        formData,
        config
      );
      
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//follow user action
export const userFollowAction = createAsyncThunk(
  "user/follow",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      
      const { data } = await axios.put(
        `${BaseUrl}/api/v1/users/follow`,
        {
          followId: userId
        },
         config
      );
      
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//unfollow user action
export const userUnfollowAction = createAsyncThunk(
  "user/unfollow",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      
      const { data } = await axios.put(
        `${BaseUrl}/api/v1/users/unfollow`,
        {
          unFollowId: userId
        },
         config
      );
      
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// fetch all users 
export const fetchUsersAction = createAsyncThunk(
  "users/fetch",
  async (users, { rejectWithValue, getState, dispatch }) => {
    ///http
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${BaseUrl}/api/v1/users`,

        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// block user action 
export const blockUserAction = createAsyncThunk(
  "users/block",
  async (id, { rejectWithValue, getState, dispatch }) => {
    ///http
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${BaseUrl}/api/v1/users/block-user/${id}`,
        {},

        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// unblock user action 
export const unblockUserAction = createAsyncThunk(
  "users/unblock",
  async (id, { rejectWithValue, getState, dispatch }) => {
    ///http
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${BaseUrl}/api/v1/users/unblock-user/${id}`,
        {},

        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userLoginFormLoacalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//map notation

// const registerUsersSlices = createSlice({
//   name: "users",
//   initialState: {
//     userAuth: "login",
//   },
//   extraReducers: {
//     [registerUserAction.pending]: (state, action) => {
//       state.loading = true;
//     },
//     [registerUserAction.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.register = action?.payload;
//     },
//     [registerUserAction.rejected]: (state, action) => {
//       state.loading = false;
//       state.register = action?.payload;
//     },
//   },
// });




//object notaion
const registerUsersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFormLoacalStorage,
  },

  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.register = action?.payload;
      state.appError = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //logout
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //user details
    builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
      state.profileLoading = true;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.profileLoading = false;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
      state.profileLoading = false;
    });
    //users details
    builder.addCase(fetchUsersAction.pending, (state, action) => {
      state.profileLoading = true;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.userList = action?.payload;
      state.profileLoading = false;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
      state.profileLoading = false;
    });
    //upload profile photo 
    builder.addCase(uploadPhotoAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(uploadPhotoAction.fulfilled, (state, action) => {
      state.uploadedPhoto = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(uploadPhotoAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //user follow action 
    builder.addCase(userFollowAction.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(userFollowAction.fulfilled, (state, action) => {
      state.followed = action?.payload;
      state.unfollowed = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isUpdate = false;
    });
    builder.addCase(userFollowAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //user unfollow action 
    builder.addCase(userUnfollowAction.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(userUnfollowAction.fulfilled, (state, action) => {
      state.unfollowed = action?.payload;
      state.followed = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isUpdate = false;
    });
    builder.addCase(userUnfollowAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //user block action 
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
     
      state.blocked = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
       
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //user unblock action 
    builder.addCase(unblockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(unblockUserAction.fulfilled, (state, action) => {
     
      state.unblocked = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unblockUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
});

export default registerUsersSlices.reducer;
