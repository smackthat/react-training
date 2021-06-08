import React from 'react';
import styled from 'styled-components';
import { PageWrapper } from '../PageWrapper';

export function CategoriesBar() {
  return (
    <>
      <Wrapper>
        <PageWrapper></PageWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 8vh;
  width: 100vw;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 1em;
  position: fixed;
  box-shadow: 1px 1px 5px grey;
  top: 15vh;
`;
