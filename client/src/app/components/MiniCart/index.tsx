import React from 'react';
import { ClickAwayListener, IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from 'app/pages/LoginPage/slice/selectors';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { CartItem } from 'types/User';
import { Link } from 'react-router-dom';
import { ItemsGrid } from '../ItemsGrid';
import { saveCart } from 'app/pages/LoginPage/slice/actions';
import { selectLoading } from 'app/pages/HomePage/slice/selectors';
import { LoadingIndicator } from '../LoadingIndicator';

export function MiniCart() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);

  let items: CartItem[] = [];

  if (cart && cart.items) {
    items = cart.items.slice();
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = event => {
    if (
      event.target.id !== 'addToCartButton' &&
      event.target.innerText !==
        t(translations.product.actions.addToCart).toUpperCase()
    ) {
      setAnchorEl(null);
    }
  };

  const handleCheckoutClick = () => {
    setAnchorEl(null);
  };

  const handleCartSave = () => {
    dispatch(saveCart());
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton aria-label="cart" onClick={handleClick}>
        <StyledBadge
          badgeContent={
            cart && cart.items.length > 0
              ? cart.items.map(p => p.quantity).reduce((a, b) => a + b)
              : null
          }
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <StyledMiniCart fontSize="large" />
        </StyledBadge>
      </IconButton>

      <StyledPopper open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <CartItems>
                {loading && <LoadingIndicator />}
                {!loading && items && items.length > 0 && (
                  <>
                    <ItemsGrid items={items} smallSize />

                    <BottomDiv>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleCartSave}
                        disabled={loading}
                      >
                        {t('minicart.actions.saveCart')}
                      </Button>

                      <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to="/checkout"
                        onClick={handleCheckoutClick}
                      >
                        {t(translations.minicart.actions.toCheckout)}
                      </Button>
                    </BottomDiv>
                  </>
                )}
                {!loading && items.length === 0 && (
                  <h4>{t(translations.minicart.noItems)}</h4>
                )}
              </CartItems>
            </ClickAwayListener>
          </Fade>
        )}
      </StyledPopper>
    </>
  );
}

const StyledMiniCart = styled(ShoppingCartIcon)`
  color: #ffffff;
`;

const StyledBadge = styled(Badge)`
  color: #ffffff;
`;

const StyledPopper = styled(Popper)`
  z-index: 3;
  padding: 0.5em;
  background: white;
  border: 1px solid grey;
`;

const CartItems = styled.div`
  width: 35vw;
  max-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1600px) {
    width: 60vw;
  }

  @media (max-width: 740px) {
    width: 85vw;
  }

  > .MuiButtonBase-root {
    align-self: flex-end;
    position: sticky;
    margin-left: 4em;
  }
`;

const BottomDiv = styled.div`
  margin-top: 2em;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
