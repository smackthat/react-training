import Paper from '@material-ui/core/Paper';
import { PageWrapper } from 'app/components/PageWrapper';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Wrapper } from '../Wrapper';

export function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Shoppe</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <PageWrapper>
        <Wrapper>
          <StyledPaper>
            <h3> Products</h3>
          </StyledPaper>
        </Wrapper>
      </PageWrapper>
    </>
  );
}

const StyledPaper = styled(Paper)`
  margin-top: 14em;
  margin-left: 20%;
  width: 60vw;
  height: 70vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;
