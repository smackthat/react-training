import { createSlice } from './../../../../utils/@reduxjs/toolkit';
import { UserState, UserErrorType, User, Cart } from './../../../../types/User';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { userSaga } from './saga';
import { PayloadAction } from '@reduxjs/toolkit';

const USER: string = 'user';
const USERCART: string = 'usercart';

const getUserFromStorage: () => User = () => {
  const userFromStorage = localStorage.getItem(USER);

  if (userFromStorage) {
    return JSON.parse(userFromStorage);
  }

  return null;
};

const getCartFromStorage: () => Cart = () => {
  const cartFromStorage = localStorage.getItem(USERCART);

  if (cartFromStorage) {
    return JSON.parse(cartFromStorage);
  }

  return null;
};

export const initialState: UserState = {
  user: getUserFromStorage(),
  loading: false,
  error: [],
  cart: getCartFromStorage(),
};

const slice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    clearError(state) {
      state.error = [];
    },
    loadUser(state) {
      state.loading = true;
    },
    logoutUser(state) {
      state.user = null;

      localStorage.removeItem(USER);
      localStorage.removeItem(USERCART);
    },
    userLoaded(state, action: PayloadAction<User>) {
      const user = action.payload;
      state.user = {
        id: user.id,
        userName: user.userName,
      };
      state.loading = false;

      localStorage.setItem(USER, JSON.stringify(action.payload));
    },
    userError(state, action: PayloadAction<UserErrorType>) {
      state.error.push(action.payload);
      state.loading = false;
    },
    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload;

      localStorage.setItem(USERCART, JSON.stringify(action.payload));
    },
  },
});

export const { actions: userActions, reducer } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};
