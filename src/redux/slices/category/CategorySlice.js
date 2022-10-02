import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

// redirect action
const resetUpdateAction = createAction("category/update-reset");
const resetDeleteAction = createAction("category/delete-reset");
const resetCreateAction = createAction("category/create-reset");

// Add category
export const addCategoryAction = createAsyncThunk(
  "add/category",
  async (category, { rejectWithValue, getState, dispatch }) => {
    ///http
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${BaseUrl}/api/v1/category`,
        {
          title: category.title,
        },
        config
      );
      //dispatch create action redirect
      dispatch(resetCreateAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// fetch all category
export const fetchCategoriesAction = createAsyncThunk(
  "fetch/category",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
        `${BaseUrl}/api/v1/category`,

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
// update category
export const updateCategoryAction = createAsyncThunk(
  "update/category",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
        `${BaseUrl}/api/v1/category/${category?.id}`,
        { title: category?.title },

        config
      );
      //dispatch for redirect
      dispatch(resetUpdateAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// delete category
export const deleteCategoryAction = createAsyncThunk(
  "delete/category",
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
      const { data } = await axios.delete(
        `${BaseUrl}/api/v1/category/${id}`,

        config
      );
      //dispatch action for redirect
      dispatch(resetDeleteAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// fetch single category
export const fetchSingleCategoryAction = createAsyncThunk(
  "fetch-single/category",
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
        `${BaseUrl}/api/v1/category/${id}`,

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

//slices
const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    //add category
    builder.addCase(addCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    //reset create action
    builder.addCase(resetCreateAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(addCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.isCreated = false;
      state.appError = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch all category
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categoryList = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //update category
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    // reset update action
    builder.addCase(resetUpdateAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.updatedCategory = action?.payload;
      state.loading = false;
      state.isUpdated = false;
      state.appError = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //delete category
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    //reset delete action
    builder.addCase(resetDeleteAction, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.deletedCategory = action?.payload;
      state.loading = false;
      state.isDeleted = false;
      state.appError = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch single category
    builder.addCase(fetchSingleCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleCategoryAction.fulfilled, (state, action) => {
      state.fetchCategory = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchSingleCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});
export default categorySlices.reducer;
