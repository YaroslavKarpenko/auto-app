import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Filter } from './types';

const initialState: Filter = {
  mark: null,
  model: null,
  page: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Filter>) {
      state.mark = action.payload.mark;
      state.model = action.payload.model;
    },
    resetFilter(state) {
      state.mark = null;
      state.model = null;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setFilter, resetFilter, setPage } = filterSlice.actions;

export default filterSlice.reducer;
