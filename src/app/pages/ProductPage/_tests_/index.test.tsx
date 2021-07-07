import * as React from 'react';
import { ProductPage } from '..';
import { MemoryRouter, Route } from 'react-router-dom';
import { translations } from 'locales/translations';
import { i18n } from 'locales/i18n';
import { render } from 'utils/test-helpers';
import { ProductCategory } from 'types/Product';
import { RootState } from 'types/RootState';

const defaultState: RootState = {
  productsState: {
    loading: false,
    error: false,
    products: [
      {
        id: 1,
        title: 'Shirt',
        description: 'A nice shirt',
        price: 9.99,
        category: ProductCategory.MENS_CLOTHING,
        image: '',
      },
    ],
  },
  userState: {
    user: null,
    loading: false,
    error: null,
  },
};
const renderProductPage = (initialState?: RootState) =>
  render(
    <MemoryRouter initialEntries={['product/1']}>
      <Route path="product/:id">
        <ProductPage></ProductPage>
      </Route>
    </MemoryRouter>,
    {
      initialState: initialState || defaultState,
    },
  );

describe('ProductPage', () => {
  it('should match snapshot', () => {
    const productPage = renderProductPage();
    expect(productPage.result).toMatchSnapshot();
  });

  it('should not have Add to cart button when user not logged in', async () => {
    const t = await i18n;

    const productPage = renderProductPage();

    expect(
      productPage.result.queryByText(
        t(translations.product.actions.addToCart) as string,
      ),
    ).not.toBeInTheDocument();
  });

  it('should have Add to cart button when user is logged in', async () => {
    const t = await i18n;

    const productPage = renderProductPage({
      ...defaultState,
      userState: {
        user: {
          id: 2,
          userName: 'TEST',
        },
        loading: false,
        error: null,
      },
    });

    expect(
      productPage.result.queryByText(
        t(translations.product.actions.addToCart) as string,
      ),
    ).toBeInTheDocument();
  });
});
