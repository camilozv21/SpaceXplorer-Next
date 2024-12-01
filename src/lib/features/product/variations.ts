import { Variation } from "@/types/variations.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const productVariationsSlice = createSlice({
  name: 'productVariations',
  initialState: {} as Variation,
  reducers: {
    setProductVariations: (_state, action: PayloadAction<Variation>) => {
      return action.payload;
    },
    resetProductVariations: () => {
      return {} as Variation;
    }
  },
});

export const { setProductVariations, resetProductVariations } = productVariationsSlice.actions;

export default productVariationsSlice.reducer;