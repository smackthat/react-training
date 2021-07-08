import { I18nextProvider } from 'react-i18next';
import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import i18nForTests from 'locales/i18nForTests';
import { configureAppStore } from 'store/configureStore';
import { RootState } from 'types/RootState';
import { EnhancedStore } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';
import { InjectedReducersType } from './types/injector-typings';
import { userReducer } from 'app/pages/LoginPage/slice';
import { productsReducer } from 'app/pages/HomePage/slice';
import { i18n } from 'locales/i18n';
import { mockProducts } from './test-mocks';

// See: https://testing-library.com/docs/react-testing-library/setup

export const defaultState: RootState = {
  productsState: {
    loading: false,
    error: false,
    products: mockProducts,
  },
  userState: {
    user: null,
    loading: false,
    error: null,
  },
};

const reducers: InjectedReducersType = {
  userState: userReducer,
  productsState: productsReducer,
};

async function customRender(
  ui: ReactElement,
  {
    initialState = defaultState,
    store = configureAppStore(initialState, reducers),
    ...options
  }: { initialState?: RootState; store?: EnhancedStore } = {},
) {
  const t = await i18n;

  return {
    result: render(
      <I18nextProvider i18n={i18nForTests}>
        <HelmetProvider>
          <Provider store={store}>{ui}</Provider>
        </HelmetProvider>
      </I18nextProvider>,
      options,
    ),
    store: store,
    t: t,
  };
}

export * from '@testing-library/react';
export { customRender as render };
