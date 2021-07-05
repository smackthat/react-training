import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useUserSlice } from 'app/pages/LoginPage/slice';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CartItem } from 'types/User';
import { CurrencyFormatter } from 'utils/formatters';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

enum SortByColumn {
  TITLE,
  QUANTITY,
  SUM,
  UNITPRICE,
}

interface Sorting {
  column: SortByColumn;
  order: 'asc' | 'desc';
}

interface Props {
  items: CartItem[];
  readOnly?: boolean;
  smallSize?: boolean;
}

export function ItemsGrid({
  items = [],
  readOnly = false,
  smallSize = false,
}: Props) {
  const { t } = useTranslation();
  const slice = useUserSlice();
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = React.useState<Sorting>({
    column: SortByColumn.TITLE,
    order: 'asc',
  });

  const currencyFormatter = React.useMemo(() => {
    return CurrencyFormatter();
  }, []);

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
      case SortByColumn.UNITPRICE:
        sortBy.order === 'asc'
          ? items.sort((a, b) => a.unitPrice - b.unitPrice)
          : items.sort((a, b) => b.unitPrice - a.unitPrice);
        break;
      default:
        break;
    }
  }

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

  return (
    <>
      <StyledContainer>
        <Table size={smallSize ? 'small' : 'medium'} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy && sortBy.column === SortByColumn.TITLE}
                  direction={
                    sortBy && sortBy.column === SortByColumn.TITLE
                      ? sortBy.order
                      : 'asc'
                  }
                  onClick={() => handleSorting(SortByColumn.TITLE)}
                >
                  {t(translations.minicart.title)}
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortBy && sortBy.column === SortByColumn.QUANTITY}
                  direction={
                    sortBy && sortBy.column === SortByColumn.QUANTITY
                      ? sortBy.order
                      : 'asc'
                  }
                  onClick={() => handleSorting(SortByColumn.QUANTITY)}
                >
                  {t(translations.minicart.quantity)}
                </TableSortLabel>
              </TableCell>
              {!smallSize && (
                <TableCell align="right">
                  <TableSortLabel
                    active={sortBy && sortBy.column === SortByColumn.UNITPRICE}
                    direction={
                      sortBy && sortBy.column === SortByColumn.UNITPRICE
                        ? sortBy.order
                        : 'asc'
                    }
                    onClick={() => handleSorting(SortByColumn.UNITPRICE)}
                  >
                    {t(translations.product.unitPrice)}
                  </TableSortLabel>
                </TableCell>
              )}
              <TableCell align="right">
                <TableSortLabel
                  active={sortBy && sortBy.column === SortByColumn.SUM}
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
                <TableCell align="right">{item.quantity}</TableCell>
                {!smallSize && (
                  <TableCell align="right">
                    {currencyFormatter.format(item.unitPrice)}
                  </TableCell>
                )}
                <TableCell align="right">
                  {currencyFormatter.format(item.sum)}
                </TableCell>
                {!readOnly && (
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleProductIncrement(item.productId)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleProductDecrement(item.productId)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      id="deleteButton"
                      size="small"
                      onClick={() =>
                        handleProductRemoveAll(item.productId, item.quantity)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
            <TableRow className="totals">
              <TableCell>{t(translations.minicart.total)}</TableCell>
              <TableCell align="right">
                {items.map(p => p.quantity).reduce((a, b) => a + b)}
              </TableCell>
              {!smallSize && <TableCell />}
              <TableCell align="right">
                {currencyFormatter.format(
                  items.map(p => p.sum).reduce((a, b) => a + b),
                )}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled(Container)`
  overflow: auto;

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
