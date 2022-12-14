import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
//reset email sent
 const resetVerifyAction = createAction('mail/reset');

export const accountVerifiedAction = createAsyncThunk("email/sent",async(email,{rejectWithValue,getState,dispatch})=>{

    try {
        //http call register api
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
             headers: {
        Authorization: `Bearer ${userAuth?.token}`,
           }
        }
        const { data } = await axios.post(
          `${BaseUrl}/api/v1/users/get-verify-email`,
          {},
          config
        );
        // dispatch(resetEmailAction())
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }

})
export const accountVerifiedLinkAction = createAsyncThunk("email/verify",async(token,{rejectWithValue,getState,dispatch})=>{

    try {
        //http call register api
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
             headers: {
        Authorization: `Bearer ${userAuth?.token}`,
           }
        }
        const { data } = await axios.put(
          `${BaseUrl}/api/v1/users/verify-account`,
          {token},
          config
        );
         dispatch(resetVerifyAction())
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }

})

const accountVerifiedSlices = createSlice({
    name: "verified",
    initialState: {
     
    },
  
    extraReducers: (builder) => {
      //email slices
      builder.addCase(accountVerifiedAction.pending, (state, action) => {
        state.loading = true;
        state.appError = undefined;
        state.serverErr = undefined;
      });
      
      builder.addCase(accountVerifiedAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action?.payload;
        state.appError = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(accountVerifiedAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
      //verify account last
      builder.addCase(accountVerifiedLinkAction.pending, (state, action) => {
        state.loading = true;
        state.appError = undefined;
        state.serverErr = undefined;
      });
       builder.addCase(resetVerifyAction, (state, action) => {
         state.isVerified = true;
       });
      builder.addCase(accountVerifiedLinkAction.fulfilled, (state, action) => {
        // state.isSend=false
        state.loading = false;
        state.isVerified = false;
        state.verified = action?.payload;
        state.appError = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(accountVerifiedLinkAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
      
    },
  });
  
export default accountVerifiedSlices.reducer;