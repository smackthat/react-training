import { loginUser } from './utils';
import { request } from 'utils/request';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserLogin, UserErrorType, User } from './../../../../types/User';
import { userActions } from '.';
import { put, takeLatest, delay, select, call } from 'redux-saga/effects';
import { selectUser } from './selectors';

const baseUrl: string = 'https://fakestoreapi.com';

export function* getUser(userLoginPayload: PayloadAction<UserLogin>) {
  const userLogin = userLoginPayload.payload;

  const userNameMissing = userLogin.name.length === 0;
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

  yield delay(500);

  try {
    // FakeStoreAPI has cors error, so let's just mock this for now...
    // const body = {
    //   username: userLogin.name,
    //   password: userLogin.password,
    // };

    // const a = yield call(request, `${baseUrl}/auth/login`, {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    // });

    // Some hardcodings for now... (from https://fakestoreapi.com/users/)
    yield put(
      userActions.userLoaded({
        id: 2,
        userName: 'mor_2314',
      }),
    );

    // Load the user cart after successful user load
    yield getUserCart();
  } catch (error) {
    yield put(userActions.userError(UserErrorType.RESPONSE_ERROR));
  }
}

function* getUserCart() {
  yield delay(500);

  // Select username from store
  const user: User = yield select(selectUser);

  try {
    const url = `${baseUrl}/carts/user/${user.id}`;

    const cart = yield call(request, url);

    yield put(
      userActions.setCart({
        products: cart[0].products,
      }),
    );
  } catch (error) {
    console.log('Something went amiss: ', error);
  }
}

export function* userSaga() {
  yield takeLatest(loginUser.type, getUser);
}
