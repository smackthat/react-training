import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

export const selectUserName = createSelector(
  [(state: RootState) => state.user || initialState],
  userState => userState.name,
);

export const selectLoading = createSelector(
  [(state: RootState) => state.user || initialState],
  userState => userState.loading,
);

export const selectError = createSelector(
  [(state: RootState) => state.user || initialState],
  userState => userState.error,
);
