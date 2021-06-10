/**
 * Asynchronously loads the component for LogoutPage
 */

import { lazyLoad } from 'utils/loadable';

export const LogoutPage = lazyLoad(
  () => import('./index'),
  module => module.LogoutPage,
);
