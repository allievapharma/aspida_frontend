import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/productsApi";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
