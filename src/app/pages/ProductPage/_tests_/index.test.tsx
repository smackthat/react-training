import * as React from 'react';
import { ProductPage } from '..';
import { MemoryRouter, Route } from 'react-router-dom';
import { translations } from 'locales/translations';
import { defaultState, fireEvent, render } from 'utils/test-helpers';
import { RootState } from 'types/RootState';
import { mockLoggedInUserState } from 'utils/test-mocks';

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
  it('should match snapshot', async () => {
    const productPage = await renderProductPage();
    expect(productPage.result).toMatchSnapshot();
  });

  it('should not have Add to cart button when user not logged in', async () => {
    const productPage = await renderProductPage();

    expect(
      productPage.result.queryByText(
        productPage.t(translations.product.actions.addToCart) as string,
      ),
    ).not.toBeInTheDocument();
  });

  it('should have Add to cart button when user is logged in', async () => {
    const productPage = await renderProductPage({
      ...defaultState,
      userState: mockLoggedInUserState,
    });

    expect(
      productPage.result.queryByText(
        productPage.t(translations.product.actions.addToCart) as string,
      ),
    ).toBeInTheDocument();
  });

  it('should add one item on Add to cart button click', async () => {
    const productPage = await renderProductPage({
      ...defaultState,
      userState: mockLoggedInUserState,
    });

    const addToCartButton = productPage.result.getByText(
      productPage.t(translations.product.actions.addToCart) as string,
    );
    fireEvent.click(addToCartButton);

    expect(
      (productPage.store.getState() as RootState).userState.cart.items.length,
    ).toBe(1);
  });
});
