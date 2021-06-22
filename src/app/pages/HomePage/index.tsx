import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { FeaturedProduct } from 'app/components/FeaturedProduct';
import { Wrapper } from 'app/pages/Wrapper';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { useProductsSlice } from './slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectProducts } from './slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

export function HomePage() {
  const productsSlice = useProductsSlice();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const loading = useSelector(selectLoading);
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(productsSlice.actions.load());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Shoppe</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      {/* <Navbar />
      <CategoriesBar /> */}
      <PageWrapper>
        <Wrapper>
          <StyledPaper>
            <h3>{t(translations.title)}</h3>
            {loading && <LoadingIndicator />}

            {!loading && <FeaturedProduct />}
          </StyledPaper>
        </Wrapper>
      </PageWrapper>
    </>
  );
}

const StyledPaper = styled(Paper)`
  margin-left: 15%;
  width: 60vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;
