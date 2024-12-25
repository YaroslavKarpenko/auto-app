import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adApi from '../../api/ads';
import { Ad } from './types';

export const initializeAds = createAsyncThunk<
  { cars: Ad[]; total: number },
  { token: string; page: number; markId: string | null; modelId: string | null }
>('ads/getAll', async ({ token, page, markId, modelId }) => {
  const data = await adApi.fetchAds(token, page, markId, modelId);
  return { cars: data.cars, total: data.documentTotalCount };
});

export const newAd = createAsyncThunk<
  void,
  { token: string; page: number; newAdObj: Ad; markId: string | null; modelId: string | null }
>('ads/newAd', async ({ token, page, newAdObj, markId, modelId }, { dispatch }) => {
  await adApi.createAd(token, newAdObj);
  dispatch(initializeAds({ token, page, markId, modelId }));
});

// export const updateAd = createAsyncThunk<void, { token: string; page: number; newAdObj: Ad }>(
//   'ads/updateAd',
//   async ({ token, page, newAdObj }, { dispatch }) => {
//     await adApi.createAd(token, newAdObj);
//     dispatch(initializeAds({ token, page }));
//   },
// );

// export const removeData = createAsyncThunk<void, { token: string; fileId: string; title: string }>(
//   'data/removeData',
//   async ({ token, fileId, title }, { dispatch }) => {
//     await dataService.deleteData(token, fileId, title);
//     dispatch(initializeData(token));
//   },
// );

export enum LoadingStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'succeeded',
  REJECTED = 'failed',
}

interface AdSliceState {
  ads: Ad[];
  totalAds: number;
  loading: LoadingStatus;
}

const initialState: AdSliceState = { ads: [], totalAds: 0, loading: LoadingStatus.IDLE };

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeAds.pending, (state) => {
      state.ads = [];
      state.totalAds = 0;
      state.loading = LoadingStatus.PENDING;
    });
    builder.addCase(initializeAds.fulfilled, (state, action) => {
      state.ads = action.payload.cars;
      state.totalAds = action.payload.total;
      state.loading = LoadingStatus.FULFILLED;
    });
    builder.addCase(initializeAds.rejected, (state) => {
      state.ads = [];
      state.totalAds = 0;
      state.loading = LoadingStatus.REJECTED;
    });
  },
});

// export const {} = dataSlice.actions;
export default dataSlice.reducer;
