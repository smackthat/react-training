import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { ItemsGrid } from 'app/components/ItemsGrid';
import { PageWrapper } from 'app/components/PageWrapper';
import { translations } from 'locales/translations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectOrders } from '../LoginPage/slice/selectors';
import { Wrapper } from '../Wrapper';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { BillingMethodToString } from 'types/BillingMethod';
import { CurrencyFormatter, formatAddress } from 'utils/formatters';
import { Order } from 'types/User';

export function OrderHistoryPage() {
  const { t } = useTranslation();
  const orders = useSelector(selectOrders);

  const currencyFormatter = React.useMemo(() => {
    return CurrencyFormatter();
  }, []);

  return (
    <>
      <PageWrapper>
        <Wrapper>
          <StyledPaper>
            <Typography>{t(translations.order.orderHistory)}</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>{t(translations.order.orderDate)}</TableCell>
                  <TableCell>{t(translations.order.deliveryDate)}</TableCell>
                  <TableCell>{t(translations.order.deliveryAddress)}</TableCell>
                  <TableCell>{t(translations.order.billingMethod)}</TableCell>
                  <TableCell>{t(translations.order.billingAddress)}</TableCell>
                  <TableCell>{t(translations.order.totalSum)}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <Row
                    key={formatAddress(order.deliveryAddress)}
                    order={order}
                    currencyFormatter={currencyFormatter}
                  />
                ))}
                {orders.length === 0 && (
                  <Typography>{t(translations.order.noOrders)}</Typography>
                )}
              </TableBody>
            </Table>
          </StyledPaper>
        </Wrapper>
      </PageWrapper>
    </>
  );
}

function Row(props: { order: Order; currencyFormatter: Intl.NumberFormat }) {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState<boolean>(false);
  const { order, currencyFormatter } = props;

  return (
    <>
      <TableRow key={order.orderDate + formatAddress(order.deliveryAddress)}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
        <TableCell>
          {new Date(order.deliveryDate).toLocaleDateString()}
        </TableCell>
        <TableCell>{formatAddress(order.deliveryAddress)}</TableCell>
        <TableCell>{BillingMethodToString(order.billingMethod, t)}</TableCell>
        <TableCell>{formatAddress(order.billingAddress)}</TableCell>
        <TableCell align="right">
          {currencyFormatter.format(order.totalSum)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography gutterBottom>
                {t(translations.order.items)}
              </Typography>
              <ItemsGrid items={order.items.slice()} readOnly smallSize />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const StyledPaper = styled(Paper)`
  margin-left: 10%;
  width: 70vw;
  padding: 3em;
`;
