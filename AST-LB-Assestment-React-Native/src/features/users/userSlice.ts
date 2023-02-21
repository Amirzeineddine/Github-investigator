import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";
import { current } from "@reduxjs/toolkit";
interface Token {
  token: string;
}

interface usersState {
  users: [];
  isError: boolean | null;
  isSuccess: boolean | null;
  isLoading: boolean;
  message: string | null;
}

const initialState: usersState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// all user
export const Getusers = createAsyncThunk(
  "users/Getusers",
  async (page: number, thunkAPI) => {
    try {
      const token: any = "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";
      //   (thunkAPI.getState() as any).auth.user.token;
      return await usersService.Getusers(page, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// all user
export const SearchUsers = createAsyncThunk(
  "search/users?q=",
  async (search: string, thunkAPI) => {
    try {
      const token: any = "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";
      //   (thunkAPI.getState() as any).auth.user.token;
      return await usersService.SearchUsers(search, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(Getusers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(Getusers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      .addCase(SearchUsers.pending, (state) => {
        // console.log(current(state));
        state.isLoading = true;
      })
      .addCase(SearchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        // console.log(current(state));
      })
      .addCase(SearchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = UserSlice.actions;
export default UserSlice.reducer;
