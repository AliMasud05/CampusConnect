import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
interface AuthState {
  token: string | null;
  refresh_token: string | null;
}

const initialState: AuthState = {
  token: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      
      state.token = action.payload.token;
    },
    setRefreshToken: (
      state,
      action: PayloadAction<{ refresh_token: string }>
    ) => {
      state.refresh_token = action.payload.refresh_token;
    },
    logout: (state) => {
      state.token = null;
      state.refresh_token = null;
      Cookies.remove("accessToken");
    },
  },
});

export const { setUser, setRefreshToken, logout } = authSlice.actions;

export default authSlice.reducer;
