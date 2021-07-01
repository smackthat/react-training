import React from 'react';
import { ClickAwayListener, IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import { selectCart } from 'app/pages/LoginPage/slice/selectors';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { CartItem } from 'types/User';
import { Link } from 'react-router-dom';
import { ItemsGrid } from '../ItemsGrid';

export function MiniCart() {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const cart = useSelector(selectCart);

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
                {items && items.length > 0 && (
                  <>
                    <ItemsGrid smallSize />

                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to="/checkout"
                      onClick={handleCheckoutClick}
                    >
                      {t(translations.minicart.actions.toCheckout)}
                    </Button>
                  </>
                )}
                {items.length === 0 && (
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

  > a {
    margin-top: 2em;
    align-self: flex-end;
    position: sticky;
  }
`;
