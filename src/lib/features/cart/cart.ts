import { CartProduct } from "@/types/cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartProduct[] = [];

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const productExists = state.find(item => item.id === action.payload.id);

      if (!productExists) {
        state.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const product = state.find(item => item.id === action.payload.id);

      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cart.actions;
export default cart.reducer;