import { Filter } from "@/types/filter.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = Filter[];

const initialState: State = [];

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state: State, action: PayloadAction<Filter>) => {
      state.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<Filter>) => {
      return state.filter(filter => filter.label !== action.payload.label);
    },
    setAllFilters: (state, action: PayloadAction<Filter[]>) => {
      return action.payload;
    },
    updateFilter: (state, action: PayloadAction<Filter>) => {
      const index = state.findIndex(filter => filter.value === action.payload.value);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    clearFilters: () => {
      return [];
    },
  },
});

export const { setFilters, removeFilter, setAllFilters, updateFilter, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;