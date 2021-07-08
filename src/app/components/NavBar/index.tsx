import React from 'react';
import styled from 'styled-components';
import { Searchbar } from 'app/components/Searchbar';
import { HomeButton } from 'app/components/HomeButton';
import { LanguageButton } from 'app/components/LanguageButton';
import { MiniCart } from 'app/components/MiniCart';
import { PageWrapper } from '../PageWrapper';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/pages/LoginPage/slice/selectors';
import { User } from 'types/User';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { ProfileButton } from 'app/components/ProfileButton';

export function Navbar() {
  const { t } = useTranslation();

  const loggedUser: User = useSelector(selectUser);

  return (
    <>
      <Wrapper>
        <PageWrapper>
          <HomeButton />

          <FloatRight>
            <Searchbar />
            {loggedUser && (
              <>
                <MiniCart />
                <ProfileButton />
              </>
            )}
            {!loggedUser && (
              <StyledLink to="/login">
                {t(translations.header.actions.login)}
              </StyledLink>
            )}
            <LanguageButton />
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
  z-index: 3;
  position: fixed;
`;
