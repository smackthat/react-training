import { UserLogin } from '../../../../types/User';
import { createAction } from '@reduxjs/toolkit';

export const loginUser = createAction<UserLogin>('loginUser');
