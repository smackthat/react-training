import React from 'react';
import styled from 'styled-components';
import { Searchbar } from 'app/components/Searchbar';
import { HomeButton } from 'app/components/HomeButton';
import { MiniCart } from 'app/components/MiniCart';
import { PageWrapper } from '../PageWrapper';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserName } from 'app/pages/LoginPage/slice/selectors';
import { useUserSlice } from 'app/pages/LoginPage/slice';

export function Navbar() {
  useUserSlice();

  const userName: string = useSelector(selectUserName);

  return (
    <>
      <Wrapper>
        <PageWrapper>
          <HomeButton />

          <FloatRight>
            <Searchbar />
            {userName && userName.length > 0 && (
              <>
                <MiniCart />
                <StyledLink to="/logout">Logout</StyledLink>
              </>
            )}
            {!userName && <StyledLink to="/login">Login</StyledLink>}
          </FloatRight>
        </PageWrapper>
      </Wrapper>
    </>
  );
}

const StyledLink = styled(Link)`
  color: white;
  border: 2px solid white;
  text-decoration: none;
  text-transform: uppercase;
  font-size: smaller;
  padding: 0.5em;
  align-self: center;
  margin-left: 2em;
`;

const FloatRight = styled.div`
  display: flex;
  float: right;
`;

const Wrapper = styled.header`
  height: 15vh;
  width: 100vw;
  background: -moz-linear-gradient(top, #142062 0%, #004ba8 72%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #142062),
    color-stop(72%, #004ba8)
  );
  background: -webkit-linear-gradient(top, #142062 0%, #004ba8 72%);
  background: -o-linear-gradient(top, #142062 0%, #004ba8 72%);
  background: -ms-linear-gradient(top, #142062 0%, #004ba8 72%);
  background: linear-gradient(to bottom, #142062 0%, #004ba8 72%);
  display: flex;
  align-items: flex-end;
  top: 0;
  padding-bottom: 1em;
  position: fixed;
`;
