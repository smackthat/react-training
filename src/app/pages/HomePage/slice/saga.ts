import { selectProducts } from './selectors';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { productsActions } from '.';

const baseUrl: string = 'https://fakestoreapi.com';

export function* getProducts() {
  try {
    const products = yield call(request, `${baseUrl}/products`);

    yield put(productsActions.productsLoaded(products));
  } catch (error) {
    yield put(productsActions.onError());
  }
}

export function* productsSaga() {
  yield takeLatest(productsActions.load.type, getProducts);
}
