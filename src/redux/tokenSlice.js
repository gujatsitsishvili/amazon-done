import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const TokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.user = action.payload;
    },
    clearToken: (state) => {
      state.user = null;
    },
  },
});

export const { setToken, clearToken } = TokenSlice.actions;
export default TokenSlice.reducer;
