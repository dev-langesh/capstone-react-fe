import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      id: "1",
      name: "Oneplus",
      quantity: 1,
      price: 20,
      subtotal: 20,
    },
  ],
};

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.value = action.payload;
    },
    addItem: (state, action) => {
      const products = [
        ...state.value,
        {
          ...action.payload,
          id: action.payload._id,
        },
      ];

      state.value = products;
    },

    increaseQuantity: (state, action) => {
      const product = state.value.find((p) => p._id === action.payload.id);

      console.log(product);

      product.quantity = action.payload.quantity;

      product.subtotal = product.price * action.payload.quantity;
    },

    removeItem: (state, action) => {
      const filtered = state.value.filter((p) => p._id !== action.payload.id);

      state.value = filtered;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, addItems, increaseQuantity, removeItem } =
  cartSlice.actions;

export const getCart = (state) => state.cart;

export default cartSlice.reducer;

// The above code is my cart slice for redux.

// Create a cart component using table in mui.
