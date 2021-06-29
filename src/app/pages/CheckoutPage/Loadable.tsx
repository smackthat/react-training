/**
 * Asynchronously loads the component for CheckoutPage
 */

import { lazyLoad } from 'utils/loadable';

export const CheckoutPage = lazyLoad(
  () => import('./index'),
  module => module.CheckoutPage,
);
