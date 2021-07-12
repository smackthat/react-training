import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { PageWrapper } from 'app/components/PageWrapper';
import { translations } from 'locales/translations';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { CurrencyFormatter } from 'utils/formatters';
import { selectProducts } from '../HomePage/slice/selectors';
import { userActions } from '../LoginPage/slice';
import { selectCart, selectUser } from '../LoginPage/slice/selectors';
import { Wrapper } from '../Wrapper';

interface Params {
  id: string;
}

export function ProductPage() {
  const { id } = useParams<Params>();
  const actions = userActions;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [quantity, setQuantity] = React.useState<number>(1);

  const currencyFormatter = React.useMemo(() => CurrencyFormatter(), []);
  const product = useSelector(selectProducts).find(p => p.id === Number(id));
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);

  const handleAddItem = () => {
    if (cart && cart.items.some(i => i.productId === product.id)) {
      dispatch(
        actions.incrementCartItem({
          productId: product.id,
          quantity: quantity,
        }),
      );
    } else {
      dispatch(
        actions.addNewCartItem({
          product: product,
          quantity: quantity,
        }),
      );
    }
  };

  const handleQuantityChange = e => {
    if (+e.target.value < 1) {
      setQuantity(1);
    } else {
      setQuantity(+e.target.value);
    }
  };

  return (
    <>
      <Helmet>
        <title>Shoppe - {product?.title}</title>
        <meta name="description" content="Product page" />
      </Helmet>

      <PageWrapper>
        <Wrapper>
          <StyledPaper>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <StyledImg src={product?.image} alt={product?.title} />
              </Grid>
              <Grid item xs={8} md={6}>
                <ProductDetailsDiv>
                  <Typography variant="h6" gutterBottom>
                    {product?.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {currencyFormatter.format(product?.price)}
                  </Typography>
                  {user && (
                    <AddToBasketDiv>
                      <Button
                        id="addToCartButton"
                        variant="contained"
                        color="primary"
                        onClick={handleAddItem}
                      >
                        {t(translations.product.actions.addToCart)}
                      </Button>
                      <TextField
                        id="outlined-number"
                        label={t('product.quantity')}
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: {
                            min: 1,
                            max: 1000,
                          },
                        }}
                        variant="outlined"
                      />
                    </AddToBasketDiv>
                  )}
                </ProductDetailsDiv>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2" gutterBottom>
                  {t(translations.product.description)}
                </Typography>
                <Typography variant="subtitle2">
                  {product?.description}
                </Typography>
              </Grid>
            </Grid>
          </StyledPaper>
        </Wrapper>
      </PageWrapper>
    </>
  );
}

const ProductDetailsDiv = styled.div`
  padding: 1em;
`;

const StyledImg = styled.img`
  max-height: 240px;
  max-width: 300px;

  @media (max-width: 800px) {
    max-height: 160px;
    max-width: 130px;
  }
`;

const StyledPaper = styled(Paper)`
  margin-left: 10%;
  width: 70vw;
  padding: 3em;
`;

const AddToBasketDiv = styled.div`
  display: flex;
  margin-top: 2em;

  & .MuiTextField-root {
    margin-left: 1em;
    width: 5em;
  }
`;
