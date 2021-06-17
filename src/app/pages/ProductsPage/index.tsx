import Paper from '@material-ui/core/Paper';
import { PageWrapper } from 'app/components/PageWrapper';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ProductCategory } from 'types/Product';
import { selectProducts } from '../HomePage/slice/selectors';
import { Wrapper } from '../Wrapper';
import { CurrencyFormatter } from 'utils/formatters';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface Params {
  category?: ProductCategory;
  search?: string;
}

export function ProductsPage() {
  const { category, search } = useParams<Params>();

  const currencyFormatter = React.useMemo(() => CurrencyFormatter(), []);

  const products = useSelector(selectProducts).filter(p =>
    category
      ? p.category === category.valueOf()
      : search
      ? p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      : true,
  );

  const getTitle = () => {
    if (category) {
      switch (category) {
        case ProductCategory.ELECTRONICS:
          return 'Electronics';
        case ProductCategory.JEWELERY:
          return 'Jewelery';
        case ProductCategory.MENS_CLOTHING:
          return `Men's clothing`;
        case ProductCategory.WOMENS_CLOTHING:
          return `Women's clothing`;
        default:
          return '';
      }
    } else if (search) {
      return `Search results for '${search}'`;
    }

    return '';
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
            <StyledDiv>
              <Typography variant="subtitle1" gutterBottom>
                {getTitle()}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container justify="flex-start" spacing={4}>
                    {products.map(p => (
                      <Grid key={p.id} item xs={12} md={3} spacing={1}>
                        <StyledLink to={`/product/${p.id}`}>
                          <StyledProductPaper>
                            <StyledImg src={p.image} />
                            <Typography variant="subtitle1" gutterBottom>
                              {p.title}
                            </Typography>
                            <Typography variant="subtitle2">
                              {currencyFormatter.format(p.price)}
                            </Typography>
                          </StyledProductPaper>
                        </StyledLink>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              {products.length === 0 && <Typography>No results.</Typography>}
            </StyledDiv>
          </StyledPaper>
        </Wrapper>
      </PageWrapper>
    </>
  );
}

const StyledPaper = styled(Paper)`
  margin-left: 10%;
  width: 70vw;
`;

const StyledDiv = styled.div`
  flex-grow: 1;
  padding: 2em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledProductPaper = styled(Paper)`
  width: 100%;
  height: 300px;
  text-align: center;
  padding: 2em;
`;

const StyledImg = styled.img`
  max-width: 40%;
  max-height: 40%;
  margin-bottom: 1em;
`;
