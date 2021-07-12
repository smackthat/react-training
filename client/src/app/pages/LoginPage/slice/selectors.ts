import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const userDomain = [(state: RootState) => state.userState || initialState];

export const selectUser = createSelector(
  userDomain,
  userState => userState.user,
);

export const selectLoading = createSelector(
  userDomain,
  userState => userState.loading,
);

export const selectError = createSelector(
  userDomain,
  userState => userState.error,
);

export const selectCart = createSelector(
  userDomain,
  userState => userState.cart,
);

export const selectAddresses = createSelector(
  userDomain,
  userState => userState.addresses,
);

export const selectOrders = createSelector(
  userDomain,
  userState => userState.orderHistory,
);
