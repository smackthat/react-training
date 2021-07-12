import React from 'react';
import { defaultState, render } from 'utils/test-helpers';
import { fireEvent, screen, within } from '@testing-library/react';
import { ItemsGrid } from '..';
import { mockCartItems } from 'utils/test-mocks';
import { translations } from 'locales/translations';
import { RootState } from 'types';

const initState: RootState = {
  ...defaultState,
  userState: {
    ...defaultState.userState,
    cart: {
      items: mockCartItems,
    },
  },
};

const renderItemsGrid = (readOnly: boolean = false) =>
  render(
    <ItemsGrid
      items={initState.userState.cart.items}
      readOnly={readOnly}
    ></ItemsGrid>,
    {
      initialState: initState,
    },
  );

describe('ItemsGrid', () => {
  it('should match snapshot', async () => {
    const handler = await renderItemsGrid();
    expect(handler.result).toMatchSnapshot();
  });

  it('should update the totals sum correctly', async () => {
    const { t, store } = await renderItemsGrid();

    const row = screen.getByText(mockCartItems[0].title).closest('tr');
    const incrementButton = within(row).getByLabelText(
      t(translations.items.actions.increment) as string,
    );
    const decrementButton = within(row).getByLabelText(
      t(translations.items.actions.decrement) as string,
    );

    fireEvent.click(incrementButton);

    let updatedItems = (store.getState() as RootState).userState.cart.items;
    expect(updatedItems.map(i => i.quantity).reduce((a, b) => a + b)).toBe(10);

    fireEvent.click(decrementButton);

    updatedItems = (store.getState() as RootState).userState.cart.items;
    expect(updatedItems.map(i => i.quantity).reduce((a, b) => a + b)).toBe(9);
  });

  it('should not have item increment and decrement buttons when readonly', async () => {
    const { t } = await renderItemsGrid(true);

    const incrementButtons = screen.queryAllByLabelText(
      t(translations.items.actions.increment) as string,
    );
    const decrementButtons = screen.queryAllByLabelText(
      t(translations.items.actions.decrement) as string,
    );

    expect(incrementButtons).toHaveLength(0);
    expect(decrementButtons).toHaveLength(0);
  });
});
