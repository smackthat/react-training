import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userActions } from '../LoginPage/slice';

export function LogoutPage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.logoutUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to="/" />;
}
