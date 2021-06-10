import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useUserSlice } from '../LoginPage/slice';

export function LogoutPage() {
  const { actions } = useUserSlice();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.logoutUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to="/" />;
}
