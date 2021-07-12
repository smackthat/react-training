import React from 'react';
import { render } from 'utils/test-helpers';
import { Navbar } from '..';
import { MemoryRouter, Route } from 'react-router-dom';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Route path="/">
        <Navbar></Navbar>,
      </Route>
    </MemoryRouter>,
  );

describe('Navbar', () => {
  it('should match snapshot', async () => {
    const navbar = await renderNavbar();
    expect(navbar.result).toMatchSnapshot();
  });
});
