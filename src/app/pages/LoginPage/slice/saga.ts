import { loginUser } from './utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { User, UserLogin } from './../../../../types/User';
import { userActions } from '.';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { selectUserName } from './selectors';

export function* getUser(foo: PayloadAction<UserLogin>) {
  console.log(foo);
  yield delay(500);

  yield put(
    userActions.userLoaded({ name: 'Risto', loading: false, error: null }), // TODO
  );
}

export function* userSaga() {
  yield takeLatest(loginUser.type, getUser);
}
