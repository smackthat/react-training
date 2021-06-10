import { createSlice } from './../../../../utils/@reduxjs/toolkit';
import { User, UserErrorType } from './../../../../types/User';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { userSaga } from './saga';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: User = {
  name: '',
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser(state) {
      state.loading = true;
      state.error = null;
      state.name = null;
    },
    logoutUser(state) {
      state.name = null;
    },
    userLoaded(state, action: PayloadAction<User>) {
      const user = action.payload;
      state.name = user.name;
      state.loading = false;
    },
    userError(state, action: PayloadAction<UserErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: userActions, reducer } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};
