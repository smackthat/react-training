import { Paper, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { PageWrapper } from 'app/components/PageWrapper';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { UserErrorType, UserLogin } from 'types/User';
import { Wrapper } from '../Wrapper';
import { useUserSlice } from './slice';
import { selectError, selectLoading, selectUser } from './slice/selectors';
import { loginUser } from './slice/actions';
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

export function LoginPage() {
  useUserSlice();

  const dispatch = useDispatch();

  const loggedUser = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [userName, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleLoginClick = () => {
    const userLogin: UserLogin = {
      name: userName,
      password,
    };

    dispatch(loginUser(userLogin));
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const hasUserNameError: () => boolean = () => {
    return (
      error &&
      (error.some(e => e === UserErrorType.USER_NAME_EMPTY) ||
        error.some(e => e === UserErrorType.USER_NOT_FOUND))
    );
  };

  const getUserNameErrorText: () => string = () => {
    return error.some(e => e === UserErrorType.USER_NAME_EMPTY)
      ? 'Name is empty'
      : error.some(e => e === UserErrorType.USER_NOT_FOUND)
      ? 'User not found'
      : '';
  };

  const hasPasswordError: () => boolean = () => {
    return (
      error &&
      (error.some(e => e === UserErrorType.PASSWORD_EMPTY) ||
        error.some(e => e === UserErrorType.USER_NOT_FOUND))
    );
  };

  const getPasswordErrorText: () => string = () => {
    return error.some(e => e === UserErrorType.PASSWORD_EMPTY)
      ? 'Password is empty'
      : '';
  };

  const handleErrorSnackbarClose = () => {};

  return (
    <>
      <Helmet>
        <title>Shoppe</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      {error && error.some(e => e === UserErrorType.RESPONSE_ERROR) && (
        <Snackbar
          open={error.length > 0}
          onClose={handleErrorSnackbarClose}
          autoHideDuration={5000}
        >
          <span>Something went boo boo...</span>
        </Snackbar>
      )}

      {loggedUser && <Redirect to="/" />}
      <PageWrapper>
        <Wrapper>
          <StyledPaper>
            {isLoading && (
              <div style={{ display: 'flex' }}>
                <LoadingIndicator></LoadingIndicator>
              </div>
            )}
            {!isLoading && (
              <>
                <h3>Login please</h3>

                <TextField
                  label="User name"
                  value={userName}
                  error={hasUserNameError()}
                  helperText={getUserNameErrorText()}
                  onChange={onNameChange}
                ></TextField>

                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  error={hasPasswordError()}
                  helperText={getPasswordErrorText()}
                  onChange={onPasswordChange}
                ></TextField>

                <Button onClick={handleLoginClick}>Login!</Button>
              </>
            )}
          </StyledPaper>
        </Wrapper>
      </PageWrapper>
    </>
  );
}

const StyledPaper = styled(Paper)`
  margin-left: 25%;
  width: 40vw;
  height: 50vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;
