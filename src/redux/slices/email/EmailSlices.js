import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
//reset email sent
const resetEmailAction = createAction('mail/reset');

export const emailSentAction = createAsyncThunk("email/sent",async(email,{rejectWithValue,getState,dispatch})=>{

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
          `${BaseUrl}/api/v1/email`,
         {  to:email?.recipientEmail,
         subject: email?.subject,
         message: email?.message},
          config
        );
        dispatch(resetEmailAction())
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }

})

const sentEmailSlices = createSlice({
    name: "email",
    initialState: {
     
    },
  
    extraReducers: (builder) => {
      //email slices
      builder.addCase(emailSentAction.pending, (state, action) => {
        state.loading = true;
        state.appError = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(resetEmailAction, (state, action) => {
        state.isSend = true;
      });
      builder.addCase(emailSentAction.fulfilled, (state, action) => {
        state.isSend=false
        state.loading = false;
        state.mail = action?.payload;
        state.appError = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(emailSentAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
      
    },
  });
  
export default sentEmailSlices.reducer;