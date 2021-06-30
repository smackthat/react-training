import { createSlice } from './../../../../utils/@reduxjs/toolkit';
import {
  UserState,
  UserErrorType,
  User,
  Cart,
  ItemAndQuantity,
  ProductAndQuantity,
} from './../../../../types/User';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { userSaga } from './saga';
import { PayloadAction } from '@reduxjs/toolkit';

const USER: string = 'user';
const USERCART: string = 'usercart';

const getUserFromStorage: () => User = () => {
  const userFromStorage = sessionStorage.getItem(USER);

  if (userFromStorage) {
    return JSON.parse(userFromStorage);
  }

  return null;
};

const getCartFromStorage: () => Cart = () => {
  const cartFromStorage = sessionStorage.getItem(USERCART);

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
  orderHistory: [],
  addresses: [],
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

      sessionStorage.removeItem(USER);
      sessionStorage.removeItem(USERCART);
    },
    userLoaded(state, action: PayloadAction<User>) {
      const user = action.payload;
      state.user = {
        id: user.id,
        userName: user.userName,
      };
      state.loading = false;

      sessionStorage.setItem(USER, JSON.stringify(action.payload));
    },
    userError(state, action: PayloadAction<UserErrorType>) {
      state.error.push(action.payload);
      state.loading = false;
    },
    incrementCartItem(state, action: PayloadAction<ItemAndQuantity>) {
      const item = state.cart.items.find(
        p => p.productId === action.payload.productId,
      );

      if (item) {
        const price = item.sum / item.quantity;
        item.quantity += action.payload.quantity;
        item.sum = Math.round(price * item.quantity * 100) / 100;

        sessionStorage.setItem(USERCART, JSON.stringify(state.cart));
      }
    },
    decrementCartItem(state, action: PayloadAction<ItemAndQuantity>) {
      const item = state.cart.items.find(
        p => p.productId === action.payload.productId,
      );

      if (item) {
        if (action.payload.quantity >= item.quantity) {
          state.cart.items = state.cart.items.filter(
            p => p.productId !== item.productId,
          );
        } else {
          const price = item.sum / item.quantity;
          item.quantity -= action.payload.quantity;
          item.sum = Math.round(price * item.quantity * 100) / 100;
        }

        sessionStorage.setItem(USERCART, JSON.stringify(state.cart));
      }
    },
    addNewCartItem(state, action: PayloadAction<ProductAndQuantity>) {
      const pq = action.payload;

      state.cart.items.push({
        productId: pq.product.id,
        title: pq.product.title,
        quantity: pq.quantity,
        sum: Math.round(pq.product.price * pq.quantity * 100) / 100,
      });

      sessionStorage.setItem(USERCART, JSON.stringify(state.cart));
    },
    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload;

      sessionStorage.setItem(USERCART, JSON.stringify(action.payload));
    },
  },
});

export const { actions: userActions, reducer } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};
