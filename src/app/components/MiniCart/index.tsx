import React from 'react';
import { ClickAwayListener, IconButton, Table } from '@material-ui/core';
import { CurrencyFormatter } from 'utils/formatters';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from 'app/pages/LoginPage/slice/selectors';
import { useUserSlice } from 'app/pages/LoginPage/slice';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Container } from '@material-ui/core';

export function MiniCart() {
  const slice = useUserSlice();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const cart = useSelector(selectCart);

  const currencyFormatter = React.useMemo(() => {
    return CurrencyFormatter();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleProductIncrement = (id: number) => {
    dispatch(
      slice.actions.incrementCartItem({
        productId: id,
        quantity: 1,
      }),
    );
  };

  const handleProductDecrement = (id: number) => {
    dispatch(
      slice.actions.decrementCartItem({
        productId: id,
        quantity: 1,
      }),
    );
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
                {cart && cart.items.length > 0 && (
                  <>
                    <Container>
                      <Table size="small" stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Qty</TableCell>
                            <TableCell align="right">Sum</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cart.items.map(item => (
                            <TableRow key={item.productId}>
                              <TableCell>{item.title}</TableCell>
                              <TableCell align="right">
                                {item.quantity}
                              </TableCell>
                              <TableCell align="right">
                                {currencyFormatter.format(item.sum)}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleProductIncrement(item.productId)
                                  }
                                >
                                  <AddIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleProductDecrement(item.productId)
                                  }
                                >
                                  <RemoveIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="totals">
                            <TableCell>Total</TableCell>
                            <TableCell align="right">
                              {cart.items
                                .map(p => p.quantity)
                                .reduce((a, b) => a + b)}
                            </TableCell>
                            <TableCell align="right">
                              {currencyFormatter.format(
                                cart.items
                                  .map(p => p.sum)
                                  .reduce((a, b) => a + b),
                              )}
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Container>

                    <Button variant="outlined" color="primary">
                      Go to checkout
                    </Button>
                  </>
                )}
                {cart && cart.items.length === 0 && (
                  <h3>No items in your shopping cart.</h3>
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
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  > Button {
    margin-top: 2em;
    align-self: flex-end;
  }

  & Table {
    table-layout: fixed;

    & .totals td {
      font-weight: bold;
    }
  }
`;
