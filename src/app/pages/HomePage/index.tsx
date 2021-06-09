import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import { Navbar } from 'app/components/Navbar';
// import { CategoriesBar } from 'app/components/CategoriesBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { Wrapper } from 'app/pages/Wrapper';
import Button from '@material-ui/core/Button';

export function HomePage() {
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
          <h3>Shoppe</h3>

          <Button></Button>
        </Wrapper>
      </PageWrapper>
    </>
  );
}
