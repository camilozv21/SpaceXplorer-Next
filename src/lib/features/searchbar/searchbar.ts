import { Product } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchedProductsState {
  isLoading: boolean;
  error: Error | null;
  data: Product[] | null;
}

const initialState: SearchedProductsState = {
  isLoading: false,
  error: null,
  data: null,
};

const searchedProductsSlice = createSlice({
  name: 'searchedProducts',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.data = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },
    fetchProductsFailure: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = searchedProductsSlice.actions;

export default searchedProductsSlice.reducer;