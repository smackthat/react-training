import Typography from '@material-ui/core/Typography';
import { selectProducts } from 'app/pages/HomePage/slice/selectors';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CurrencyFormatter } from 'utils/formatters';

export function FeaturedProduct() {
  const products = useSelector(selectProducts);

  const currencyFormatter = React.useMemo(() => CurrencyFormatter(), []);

  const calculateDateKey = React.useCallback((size: number) => {
    const epoch = new Date(0).getDate();
    const elapsed = new Date().getDate() - epoch;
    return elapsed % (size - 1);
  }, []);

  const productOfTheDay =
    products.length > 0 ? products[calculateDateKey(products.length)] : null;

  if (!productOfTheDay) {
    return <></>;
  }

  return (
    <>
      <h2>The product of today!</h2>
      <StyledLink to={`/product/${productOfTheDay.id}`}>
        <StyledDiv>
          <StyledImg src={productOfTheDay.image} />
          <Typography gutterBottom>{productOfTheDay.title}</Typography>
          <Typography variant="subtitle2" gutterBottom>
            {currencyFormatter.format(productOfTheDay.price)}
          </Typography>
        </StyledDiv>
      </StyledLink>
    </>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
`;

const StyledImg = styled.img`
  max-height: 240px;
  max-width: 300px;
  margin-bottom: 2em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  & a {
    text-decoration: none;
  }
`;
