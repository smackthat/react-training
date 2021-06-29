import React from 'react';
import { ClickAwayListener, IconButton, Table } from '@material-ui/core';
import { CurrencyFormatter } from 'utils/formatters';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { CartItem } from 'types/User';
import { Link } from 'react-router-dom';

enum SortByColumn {
  TITLE,
  QUANTITY,
  SUM,
}

interface Sorting {
  column: SortByColumn;
  order: 'asc' | 'desc';
}

export function MiniCart() {
  const slice = useUserSlice();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = React.useState<Sorting>({
    column: SortByColumn.TITLE,
    order: 'asc',
  });
  const cart = useSelector(selectCart);

  let items: CartItem[] = [];

  if (cart && cart.items) {
    items = cart.items.slice();
  }

  if (items && sortBy) {
    switch (sortBy.column) {
      case SortByColumn.QUANTITY:
        sortBy.order === 'asc'
          ? items.sort((a, b) => a.quantity - b.quantity)
          : items.sort((a, b) => b.quantity - a.quantity);
        break;
      case SortByColumn.SUM:
        sortBy.order === 'asc'
          ? items.sort((a, b) => a.sum - b.sum)
          : items.sort((a, b) => b.sum - a.sum);
        break;
      case SortByColumn.TITLE:
        sortBy.order === 'asc'
          ? items.sort((a, b) => a.title.localeCompare(b.title))
          : items.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
  }

  const currencyFormatter = React.useMemo(() => {
    return CurrencyFormatter();
  }, []);

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

  const handleProductRemoveAll = (id: number, qty: number) => {
    dispatch(
      slice.actions.decrementCartItem({
        productId: id,
        quantity: qty,
      }),
    );
  };

  const handleSorting = (newSortBy: SortByColumn) => {
    setSortBy({
      column: newSortBy,
      order: sortBy ? (sortBy.order === 'asc' ? 'desc' : 'asc') : 'asc',
    });
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
                    <StyledContainer>
                      <Table size="small" stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <TableSortLabel
                                active={
                                  sortBy && sortBy.column === SortByColumn.TITLE
                                }
                                direction={
                                  sortBy && sortBy.column === SortByColumn.TITLE
                                    ? sortBy.order
                                    : 'asc'
                                }
                                onClick={() =>
                                  handleSorting(SortByColumn.TITLE)
                                }
                              >
                                {t(translations.minicart.title)}
                              </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                              <TableSortLabel
                                active={
                                  sortBy &&
                                  sortBy.column === SortByColumn.QUANTITY
                                }
                                direction={
                                  sortBy &&
                                  sortBy.column === SortByColumn.QUANTITY
                                    ? sortBy.order
                                    : 'asc'
                                }
                                onClick={() =>
                                  handleSorting(SortByColumn.QUANTITY)
                                }
                              >
                                {t(translations.minicart.quantity)}
                              </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                              <TableSortLabel
                                active={
                                  sortBy && sortBy.column === SortByColumn.SUM
                                }
                                direction={
                                  sortBy && sortBy.column === SortByColumn.SUM
                                    ? sortBy.order
                                    : 'asc'
                                }
                                onClick={() => handleSorting(SortByColumn.SUM)}
                              >
                                {t(translations.minicart.sum)}
                              </TableSortLabel>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {items.map(item => (
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
                                <IconButton
                                  id="deleteButton"
                                  size="small"
                                  onClick={() =>
                                    handleProductRemoveAll(
                                      item.productId,
                                      item.quantity,
                                    )
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="totals">
                            <TableCell>
                              {t(translations.minicart.total)}
                            </TableCell>
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
                    </StyledContainer>

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

const StyledContainer = styled(Container)`
  overflow: auto;
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

  & Table {
    table-layout: fixed;

    & .totals td {
      font-weight: bold;
    }

    & #deleteButton {
      margin-left: 1em;
    }
  }
`;
