/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { CategoriesBar } from './components/CategoriesBar';
import { LogoutPage } from './pages/LogoutPage/Loadable';
import { ProductsPage } from './pages/ProductsPage/Loadable';
import { ProductPage } from './pages/ProductPage/Loadable';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Navbar />
      <CategoriesBar />

      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/products/:category" component={ProductsPage} />
        <Route exact path="/products/search/:search" component={ProductsPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
