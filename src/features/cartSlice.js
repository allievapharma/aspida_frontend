import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";

const initialState = {
  items: [], // local cache of cart items
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    // ✅ When cart is fetched
    builder.addMatcher(
      productsApi.endpoints.getCart.matchFulfilled,
      (state, { payload }) => {
        state.items = payload;
        state.totalQuantity = payload.length;
      }
    );

    // ✅ When product added to cart
    builder.addMatcher(
      productsApi.endpoints.addToCart.matchFulfilled,
      (state, { payload }) => {
        state.items.push(payload);
        state.totalQuantity += 1;
      }
    );

    // ✅ When product removed
    builder.addMatcher(
      productsApi.endpoints.removeFromCart.matchFulfilled,
      (state, { meta }) => {
        state.items = state.items.filter((i) => i.id !== meta.arg);
        state.totalQuantity = state.items.length;
      }
    );
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
