import { Divider } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper } from '../PageWrapper';

export function CategoriesBar() {
  return (
    <>
      <Wrapper>
        <PageWrapper>
          <Items>
            <Item to="/boo">Electronics</Item>
            <StyledDivider orientation="vertical" flexItem />
            <Item to="/products">Jewelery</Item>
            <StyledDivider orientation="vertical" flexItem />
            <Item to="/products">Men's Clothing</Item>
            <StyledDivider orientation="vertical" flexItem />
            <Item to="/products">Women's Clothing</Item>
          </Items>
        </PageWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 7.5vh;
  width: 100vw;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 1em;
  position: fixed;
  box-shadow: 1px 1px 4px grey;
  top: 15vh;
`;

const StyledDivider = styled(Divider)`
  margin-right: 100px;
`;

const Item = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin-right: 2em;

  ${StyledDivider} + & {
    margin-left: 2em;
  }
`;

const Items = styled.div`
  display: flex;
  width: 100vw;
  padding-left: 1em;
  align-items: flex-end;
`;
