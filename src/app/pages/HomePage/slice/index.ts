import { createSlice } from './../../../../utils/@reduxjs/toolkit';
import { Product, ProductsState } from './../../../../types/Product';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { PayloadAction } from '@reduxjs/toolkit';
import { productsSaga } from './saga';

const PRODUCTS: string = 'products';

const getProductsFromStorage: () => Product[] = () => {
  const fromStorage = localStorage.getItem(PRODUCTS);

  if (fromStorage) {
    return JSON.parse(fromStorage);
  }

  return null;
};

export const initialState: ProductsState = {
  products: getProductsFromStorage(),
  loading: false,
  error: false,
};

const slice = createSlice({
  name: 'productsState',
  initialState,
  reducers: {
    // clearError(state) {
    //   state.error = [];
    // },
    load(state) {
      state.loading = true;
    },
    productsLoaded(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;

      localStorage.setItem(PRODUCTS, JSON.stringify(action.payload));
    },
    onError(state) {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { actions: productsActions, reducer } = slice;

export const useProductsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: productsSaga });
  return { actions: slice.actions };
};
