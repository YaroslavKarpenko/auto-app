import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const selectFilterData = (state: RootState) => state.filter;

export const selectMark = createSelector(selectFilterData, (filter) => filter.mark);
export const selectModel = createSelector(selectFilterData, (filter) => filter.model);
export const selectPage = createSelector(selectFilterData, (filter) => {
  return filter.page;
});
