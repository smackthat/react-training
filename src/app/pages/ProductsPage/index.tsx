import Paper from '@material-ui/core/Paper';
import { PageWrapper } from 'app/components/PageWrapper';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ProductCategory, ProductCategoryToString } from 'types/Product';
import { selectProducts } from '../HomePage/slice/selectors';
import { Wrapper } from '../Wrapper';
import { CurrencyFormatter } from 'utils/formatters';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface Params {
  category?: ProductCategory;
  search?: string;
}

enum SortByEnum {
  Default,
  Expensive,
  Cheap,
  Alphabetical,
}

export function ProductsPage() {
  const { category, search } = useParams<Params>();

  const [sortBy, setSortBy] = React.useState<SortByEnum>(SortByEnum.Default);

  const { t } = useTranslation();

  const currencyFormatter = React.useMemo(() => CurrencyFormatter(), []);

  const products = useSelector(selectProducts).filter(p =>
    category
      ? p.category === category.valueOf()
      : search
      ? p.title.toLowerCase().includes(search.toLowerCase()) ||
        ProductCategoryToString(p.category, t)
          .toLowerCase()
          .includes(search.toLowerCase())
      : true,
  );

  switch (sortBy) {
    case SortByEnum.Alphabetical:
      products.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case SortByEnum.Cheap:
      products.sort((a, b) => a.price - b.price);
      break;
    case SortByEnum.Expensive:
      products.sort((a, b) => b.price - a.price);
      break;
    case SortByEnum.Default:
    default:
      break;
  }

  const getTitle = () => {
    if (category) {
      return ProductCategoryToString(category, t);
    } else if (search) {
      return `Search results for '${search}'`;
    }

    return '';
  };

  const handleSortChange = e => {
    setSortBy(e.target.value);
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
              <TitleDiv>
                <Typography variant="subtitle1" gutterBottom>
                  {getTitle()}
                </Typography>

                <SortBy>
                  <InputLabel id="sortLabel">
                    {t('products.sorting.title')}
                  </InputLabel>
                  <Select
                    labelId="sortLabel"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <MenuItem value={SortByEnum.Default}>
                      {t('products.sorting.none')}
                    </MenuItem>
                    <MenuItem value={SortByEnum.Alphabetical}>
                      {t('products.sorting.alphabetical')}
                    </MenuItem>
                    <MenuItem value={SortByEnum.Expensive}>
                      {t('products.sorting.expensive')}
                    </MenuItem>
                    <MenuItem value={SortByEnum.Cheap}>
                      {t('products.sorting.cheap')}
                    </MenuItem>
                  </Select>
                </SortBy>
              </TitleDiv>

              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container justify="flex-start" spacing={4}>
                    {products.map(p => (
                      <Grid key={p.id} item xs={12} md={3}>
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

              {products.length === 0 && (
                <Typography>{t('products.noResults')}</Typography>
              )}
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

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;
`;

const SortBy = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3em;
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
