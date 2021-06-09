import { Divider, Paper, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { PageWrapper } from 'app/components/PageWrapper';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'types';
import { Wrapper } from '../Wrapper';

export function LoginPage() {
  // const dispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.user);

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

            <TextField label="User name"></TextField>

            <TextField label="Password" type="password"></TextField>

            <Button>Login!</Button>
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
