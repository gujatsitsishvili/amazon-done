import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import tokenSlice from "./tokenSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    token:tokenSlice,
  },
});
