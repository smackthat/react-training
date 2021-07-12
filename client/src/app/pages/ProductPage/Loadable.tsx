/**
 * Asynchronously loads the component for ProductPage
 */

import { lazyLoad } from 'utils/loadable';

export const ProductPage = lazyLoad(
  () => import('./index'),
  module => module.ProductPage,
);
