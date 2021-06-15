import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const productsDomain = [
  (state: RootState) => state.productsState || initialState,
];

export const selectProducts = createSelector(
  productsDomain,
  state => state.products,
);

export const selectLoading = createSelector(
  productsDomain,
  state => state.loading,
);

export const selectError = createSelector(productsDomain, state => state.error);
