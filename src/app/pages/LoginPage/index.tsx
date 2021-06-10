import { Paper, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { PageWrapper } from 'app/components/PageWrapper';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { UserLogin } from 'types/User';
import { Wrapper } from '../Wrapper';
import { useUserSlice } from './slice';
import { selectError, selectLoading, selectUserName } from './slice/selectors';
import { loginUser } from './slice/utils';

export function LoginPage() {
  useUserSlice();

  const dispatch = useDispatch();
  // const userName = useSelector(selectUserName);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [userName, setUserName] = React.useState<string>(null);
  const [password, setPassword] = React.useState<string>(null);

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

  return (
    <>
      <Helmet>
        <title>Shoppe</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <PageWrapper>
        <Wrapper>
          <StyledPaper>
            <h3>Login please</h3>

            <TextField
              label="User name"
              value={userName}
              onChange={onNameChange}
            ></TextField>

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={onPasswordChange}
            ></TextField>

            <Button onClick={handleLoginClick}>Login!</Button>
          </StyledPaper>
        </Wrapper>
      </PageWrapper>
    </>
  );
}

const StyledPaper = styled(Paper)`
  margin-top: 14em;
  margin-left: 25%;
  width: 40vw;
  height: 70vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;
