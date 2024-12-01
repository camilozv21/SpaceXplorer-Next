import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Warranty } from '../../types/gravityForms.types';

interface HasSubmitedFormState {
  isLoading: boolean;
  error: null | string;
  data: Warranty | null;
}

const initialState: HasSubmitedFormState = {
  isLoading: false,
  error: null,
  data: null,
}

const hasSubmitedFormSlice = createSlice({
  name: 'hasSubmitedForm',
  initialState,
  reducers: {
    startSubmitForm: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    submitFormSuccess: (state, action: PayloadAction<Warranty>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    resetForm: (state) => {
      state.isLoading = false;
      state.error = null;
      state.data = null;
    },
    submitFormFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});

export const { startSubmitForm, submitFormSuccess, resetForm, submitFormFailure } = hasSubmitedFormSlice.actions;

export default hasSubmitedFormSlice.reducer;