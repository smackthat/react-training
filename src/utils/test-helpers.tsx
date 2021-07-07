import { I18nextProvider } from 'react-i18next';
import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import i18n from 'locales/i18nForTests';
import { configureAppStore } from 'store/configureStore';
import { RootState } from 'types/RootState';
import { EnhancedStore } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';

// See: https://testing-library.com/docs/react-testing-library/setup

const defaultState: RootState = {
  productsState: {
    loading: false,
    error: false,
    products: [],
  },
  userState: {
    user: null,
    loading: false,
    error: null,
  },
};

function customRender(
  ui: ReactElement,
  {
    initialState = defaultState,
    store = configureAppStore(initialState),
    ...options
  }: { initialState?: RootState; store?: EnhancedStore } = {},
) {
  return {
    result: render(
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <Provider store={store}>{ui}</Provider>
        </HelmetProvider>
      </I18nextProvider>,
      options,
    ),
    store: store,
  };
}

export * from '@testing-library/react';
export { customRender as render };
