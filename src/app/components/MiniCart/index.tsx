import React from 'react';
import { ClickAwayListener, IconButton, Table } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import { selectCart } from 'app/pages/LoginPage/slice/selectors';
import { useUserSlice } from 'app/pages/LoginPage/slice';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export function MiniCart() {
  useUserSlice();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const cart = useSelector(selectCart);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton aria-label="cart" onClick={handleClick}>
        <StyledBadge
          badgeContent={
            cart
              ? cart.products.map(p => p.quantity).reduce((a, b) => a + b)
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
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Sum</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.products.map(item => (
                      <TableRow key={item.productId}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.sum}</TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <AddIcon />
                          </IconButton>
                          <IconButton size="small">
                            <RemoveIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="totals">
                      <TableCell>Total</TableCell>
                      <TableCell align="right">
                        {cart.products
                          .map(p => p.quantity)
                          .reduce((a, b) => a + b)}
                      </TableCell>
                      <TableCell align="right">
                        {cart.products.map(p => p.sum).reduce((a, b) => a + b)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button variant="outlined" color="primary">
                  Go to checkout
                </Button>
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
  padding: 1em;
  background: white;
  border: 1px solid grey;
`;

const CartItems = styled.div`
  width: 30vw;
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
