import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const selectUserData = (state: RootState) => state.user;

export const selectUsername = createSelector(selectUserData, (user) => user.username);
export const selectToken = createSelector(selectUserData, (user) => user.token);
export const selectLoadingStatusUser = createSelector(selectUserData, (user) => user.loading);
