import { LogedUser } from "@/types/auth.types";
import { createSlice } from "@reduxjs/toolkit";

interface LogedUserState {
    isLoading: boolean;
    isLoged: boolean;
    error: string | null;
    data: LogedUser | null;
}

const initialState: LogedUserState = {
    isLoading: false,
    isLoged: false,
    error: null,
    data: null,
};

const logedUserSlice = createSlice({
    name: 'logedUser',
    initialState,
    reducers: {
      userInfoStart: (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      },
      userInfoSuccess: (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
        state.isLoged = true;
      },
      userInfoFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = null;
        state.isLoged = false;
    },
      userLogOut: (state) => {
        state.isLoading = false;
        state.error = null;
        state.data = null;
        state.isLoged = false;
    }
  }});
  

export const { userInfoStart, userInfoSuccess, userInfoFailure, userLogOut } = logedUserSlice.actions;

export default logedUserSlice.reducer;