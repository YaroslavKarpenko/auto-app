import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const selectAds = (state: RootState) => state.ad;

export const selectAdList = createSelector(selectAds, (data) => data.ads);
export const selectTotalAds = createSelector(selectAds, (data) => data.totalAds);
export const selectLoadingStatus = createSelector(selectAds, (data) => data.loading);
