import { currencySum } from 'utils/helpers';
import { selectProducts } from 'app/pages/HomePage/slice/selectors';
import { loginUser, saveCart } from './actions';
import { request } from 'utils/request';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  UserLogin,
  UserErrorType,
  CartItem,
  ItemAndQuantity,
  Cart,
  User,
} from './../../../../types/User';
import { userActions } from '.';
import { put, takeLatest, select, call, delay } from 'redux-saga/effects';
import { selectUser, selectCart } from './selectors';
import { Product } from 'types/Product';

const baseUrl: string = 'http://localhost:3001/api';
const APITOKEN: string = 'apiToken';

export function* getUser(userLoginPayload: PayloadAction<UserLogin>) {
  const userLogin = userLoginPayload.payload;

  const userNameMissing = userLogin.username.length === 0;
  const passwordMissing = userLogin.password.length === 0;

  yield put(userActions.clearError());

  if (userNameMissing) {
    yield put(userActions.userError(UserErrorType.USER_NAME_EMPTY));
  }
  if (passwordMissing) {
    yield put(userActions.userError(UserErrorType.PASSWORD_EMPTY));
  }

  if (userNameMissing || passwordMissing) {
    return;
  }

  yield put(userActions.loadUser());

  try {
    const res = yield call(request, `${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLogin)
    });

    const products: Product[] = yield select(selectProducts);

    const mapCartItems: (
      itemsFromAPI: ItemAndQuantity[],
    ) => CartItem[] = items => {
      let arr: CartItem[] = [];

      for (let i = 0; i < items.length; i++) {
        let item = products.find(x => x.id === items[i].productId);

        arr.push({
          productId: item.id,
          title: item.title,
          unitPrice: item.price,
          quantity: items[i].quantity,
          sum: currencySum(item.price, items[i].quantity),
        });
      }

      return arr;
    };

    yield put(
      userActions.userLoaded({
        user: {
          userId: res.user.userId,
          userName: res.user.userName,
          name: res.user.name,
          email: res.user.email,
        },
        cart: {
          items: mapCartItems(res.user.cart),
        },
        addresses: res.user.addresses,
      }),
    );

    sessionStorage.setItem(APITOKEN, res.token);

  } catch (error) {
    yield put(userActions.userError(UserErrorType.RESPONSE_ERROR));
  }
}

function* saveUserCart() {
  yield put(userActions.loadUser());

  const cart: Cart = yield select(selectCart);
  const user: User = yield select(selectUser);

  try {
    const items: ItemAndQuantity[] = cart.items.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
    }));

    yield call(request, `${baseUrl}/user/${user.userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        cart: items,
      }),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(APITOKEN)}`,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    yield put(userActions.loadEnd());
  }
}

export function* userSaga() {
  yield takeLatest(loginUser.type, getUser);
  yield takeLatest(saveCart.type, saveUserCart);
}
