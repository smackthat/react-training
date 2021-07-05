/**
 * Asynchronously loads the component for OrderHistoryPage
 */

import { lazyLoad } from 'utils/loadable';

export const OrderHistoryPage = lazyLoad(
  () => import('./index'),
  module => module.OrderHistoryPage,
);
