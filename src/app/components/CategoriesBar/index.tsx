import { Divider } from '@material-ui/core';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProductCategory } from 'types/Product';
import { PageWrapper } from '../PageWrapper';

export function CategoriesBar() {
  const { t } = useTranslation();

  return (
    <>
      <Wrapper>
        <PageWrapper>
          <Items>
            <Item to={`/products/${ProductCategory.ELECTRONICS}`}>
              {t(translations.categories.electronics)}
            </Item>
            <StyledDivider orientation="vertical" flexItem />
            <Item to={`/products/${ProductCategory.JEWELERY}`}>
              {t(translations.categories.jewelery)}
            </Item>
            <StyledDivider orientation="vertical" flexItem />
            <Item to={`/products/${ProductCategory.MENS_CLOTHING}`}>
              {t(translations.categories.mensclothing)}
            </Item>
            <StyledDivider orientation="vertical" flexItem />
            <Item to={`/products/${ProductCategory.WOMENS_CLOTHING}`}>
              {t(translations.categories.womensclothing)}
            </Item>
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
  background: white;
  z-index: 3;
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

    @media (max-width: 660px) {
      margin-left: 1em;
    }
  }

  @media (max-width: 660px) {
    font-size: smaller;
    margin-right: 1em;
  }
`;

const Items = styled.div`
  display: flex;
  width: 100vw;
  padding-left: 1em;
  align-items: flex-end;
`;
