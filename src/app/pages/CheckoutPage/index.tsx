import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { PageWrapper } from 'app/components/PageWrapper';
import { translations } from 'locales/translations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCart } from '../LoginPage/slice/selectors';
import { Wrapper } from '../Wrapper';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Address } from 'types/User';
import { dateLocale } from 'locales/i18n';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

enum BillingMethod {
  Invoice,
  Credit,
  Cash,
}

export function CheckoutPage() {
  const { i18n, t } = useTranslation();

  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [deliveryDate, setDeliveryDate] = React.useState<Date>(null);
  const [address, setAddress] = React.useState<Address>({
    street: '',
    zipCode: null,
    city: '',
  });
  const [billingMethod, setBillingMethod] = React.useState<BillingMethod>(null);

  const cart = useSelector(selectCart);

  const steps = React.useMemo(
    () => [
      t(translations.checkout.steps.delivery),
      t(translations.checkout.steps.billing),
      t(translations.checkout.steps.review),
    ],
    [t],
  );

  const handleGoBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleDeliveryDateChange = (date: Date | null) => {
    setDeliveryDate(date);
  };

  const handleStreetChange = e => {
    setAddress({ ...address, street: e.target.value });
  };

  const handleZipCodeChange = e => {
    setAddress({ ...address, zipCode: e.target.value });
  };

  const handleCityChange = e => {
    setAddress({ ...address, city: e.target.value });
  };

  const handleBillingMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBillingMethod(+(e.target as HTMLInputElement).value);
  };

  const nextDisabled = () => {
    switch (activeStep) {
      case 0:
        return !(
          address.city.length > 0 &&
          address.zipCode.length > 0 &&
          address.street.length > 0 &&
          !!deliveryDate
        );
      case 1:
        return billingMethod === null;
      default:
        return false;
    }
  };

  const view = () => {
    switch (activeStep) {
      case 0: // Delivery info
        return (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  value={address?.street}
                  onChange={handleStreetChange}
                  label={t('address.address')}
                ></TextField>
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  value={address.zipCode ?? ''}
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 10000,
                    },
                  }}
                  onChange={handleZipCodeChange}
                  label={t('address.zipCode')}
                ></TextField>
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  value={address?.city}
                  onChange={handleCityChange}
                  label={t('address.city')}
                ></TextField>
              </Grid>
            </Grid>

            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              locale={dateLocale[i18n.language]}
            >
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label={t('order.deliveryDate')}
                value={deliveryDate}
                onChange={handleDeliveryDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change delivery date',
                }}
              />
            </MuiPickersUtilsProvider>
          </>
        );
      case 1: // Billing info
        return (
          <>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                {t('checkout.billing.billingMethod')}
              </FormLabel>
              <RadioGroup
                aria-label="billing method"
                name="billingmethod1"
                value={billingMethod}
                onChange={handleBillingMethodChange}
              >
                <FormControlLabel
                  value={BillingMethod.Invoice}
                  control={<Radio />}
                  label={t('checkout.billing.billingMethod.invoice')}
                />
                <FormControlLabel
                  value={BillingMethod.Credit}
                  control={<Radio />}
                  label={t('checkout.billing.billingMethod.credit')}
                />
                <FormControlLabel
                  value={BillingMethod.Cash}
                  control={<Radio />}
                  label={t('checkout.billing.billingMethod.cash')}
                />
              </RadioGroup>
            </FormControl>
          </>
        );
      case 2: // Review
        return (
          <>
            <Typography>{t('checkout.review.title')}</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography>Address</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6}></Grid>
            </Grid>
          </>
        );
    }
    return;
  };

  return (
    <PageWrapper>
      <Wrapper>
        <StyledPaper>
          <>
            {cart && cart.items.length === 0 && (
              <Typography>{t('checkout.cartEmpty')}</Typography>
            )}
            {cart && cart.items.length > 0 && (
              <StyledDiv>
                <Typography>{t('checkout.title')}</Typography>

                <StyledStepper activeStep={activeStep}>
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
                </StyledStepper>

                <ViewDiv>{view()}</ViewDiv>

                <NavigationButtons>
                  {activeStep > 0 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleGoBack}
                    >
                      {t('checkout.actions.previous')}
                    </Button>
                  )}

                  {activeStep < steps.length - 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={nextDisabled()}
                      onClick={handleNext}
                    >
                      {t('checkout.actions.next')}
                    </Button>
                  )}

                  {activeStep === steps.length - 1 && (
                    <SendOrderButton>Huuhaa</SendOrderButton>
                  )}
                </NavigationButtons>
              </StyledDiv>
            )}
          </>
        </StyledPaper>
      </Wrapper>
    </PageWrapper>
  );
}

const StyledPaper = styled(Paper)`
  margin-left: 10%;
  width: 70vw;
  padding: 3em;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewDiv = styled.div`
  padding: 2em;
`;

const StyledStepper = styled(Stepper)`
  & div {
    width: 80%;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  margin-top: 2em;

  & Button + Button {
    margin-left: 1em;
  }
  /* justify-content: flex-end; */
`;

const SendOrderButton = styled(Button)`
  align-self: flex-end;
  justify-self: flex-end;
`;
