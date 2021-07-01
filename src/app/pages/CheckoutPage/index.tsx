import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
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
import { AddressInput } from 'app/components/AddressInput';
import Divider from '@material-ui/core/Divider';
import { BillingMethod, BillingMethodToString } from 'types/BillingMethod';
import { ItemsGrid } from 'app/components/ItemsGrid';
import SendIcon from '@material-ui/icons/Send';

const defaultAddress: Address = {
  street: '',
  zipCode: null,
  city: '',
};

export function CheckoutPage() {
  const { i18n, t } = useTranslation();

  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [deliveryDate, setDeliveryDate] = React.useState<Date>(null);
  const [deliveryAddress, setDeliveryAddress] = React.useState<Address>(
    defaultAddress,
  );
  const [billingAddress, setBillingAddress] = React.useState<Address>(
    defaultAddress,
  );
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

  const addressValid = React.useCallback((address: Address) => {
    return (
      address.city.length > 0 &&
      address.zipCode.length > 0 &&
      address.street.length > 0
    );
  }, []);

  const handleGoBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleDeliveryDateChange = (date: Date | null) => {
    setDeliveryDate(date);
  };

  const handleBillingMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBillingMethod(+(e.target as HTMLInputElement).value);
  };

  const nextDisabled = () => {
    switch (activeStep) {
      case 0:
        return !(addressValid(deliveryAddress) && !!deliveryDate);
      case 1:
        if (billingMethod === null) {
          return true;
        }
        if (billingMethod === BillingMethod.Invoice) {
          return !addressValid(billingAddress);
        }
        return false;
      default:
        return false;
    }
  };

  const view = () => {
    switch (activeStep) {
      case 0: // Delivery info
        return (
          <>
            <FormLabel component="legend">
              {t(translations.checkout.delivery.deliveryAddress)}
            </FormLabel>
            <AddressInput
              address={deliveryAddress}
              setAddress={setDeliveryAddress}
            ></AddressInput>

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
                label={t(translations.order.deliveryDate)}
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
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    {t('checkout.billing.title')}
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
                      label={t(
                        translations.checkout.billing.billingMethod.invoice,
                      )}
                    />
                    <FormControlLabel
                      value={BillingMethod.Credit}
                      control={<Radio />}
                      label={t(
                        translations.checkout.billing.billingMethod.credit,
                      )}
                    />
                    <FormControlLabel
                      value={BillingMethod.Cash}
                      control={<Radio />}
                      label={t(
                        translations.checkout.billing.billingMethod.cash,
                      )}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                {billingMethod === BillingMethod.Invoice && (
                  <>
                    <FormLabel component="legend">
                      {t(translations.checkout.billing.billingAddress)}
                    </FormLabel>
                    <AddressInput
                      address={billingAddress}
                      setAddress={setBillingAddress}
                    ></AddressInput>
                  </>
                )}
              </Grid>
            </Grid>
          </>
        );
      case 2: // Review
        return (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <StyledCard>
                  <CardContent>
                    <FormLabel component="legend">
                      {t(translations.checkout.delivery.deliveryMethod)}
                    </FormLabel>
                    <Divider />
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">
                          {t(translations.checkout.delivery.deliveryAddress)}
                        </Typography>
                        <Typography variant="subtitle2">
                          {deliveryAddress.street}
                        </Typography>
                        <Typography variant="subtitle2">
                          {deliveryAddress.zipCode} {deliveryAddress.city}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">
                          {t(translations.order.deliveryDate)}
                        </Typography>
                        <Typography variant="subtitle2">
                          {deliveryDate.toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </StyledCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledCard>
                  <CardContent>
                    <FormLabel component="legend">
                      {t('checkout.billing.title')}
                    </FormLabel>
                    <Divider />
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">
                          {BillingMethodToString(billingMethod, t)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {billingMethod === BillingMethod.Invoice && (
                          <>
                            <Typography variant="subtitle1">
                              {t(translations.checkout.billing.billingAddress)}
                            </Typography>
                            <Typography variant="subtitle2">
                              {billingAddress.street}
                            </Typography>
                            <Typography variant="subtitle2">
                              {billingAddress.zipCode} {billingAddress.city}
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </StyledCard>
              </Grid>

              <Grid item xs={12}>
                <StyledCard>
                  <CardContent>
                    <ItemsGrid readOnly />
                  </CardContent>
                </StyledCard>
              </Grid>
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
              <Typography>{t(translations.checkout.cartEmpty)}</Typography>
            )}
            {cart && cart.items.length > 0 && (
              <StyledDiv>
                <Typography>{t(translations.checkout.title)}</Typography>

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
                      {t(translations.checkout.actions.previous)}
                    </Button>
                  )}

                  {activeStep < steps.length - 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={nextDisabled()}
                      onClick={handleNext}
                    >
                      {t(translations.checkout.actions.next)}
                    </Button>
                  )}

                  {activeStep === steps.length - 1 && (
                    <SendOrderButton
                      color="primary"
                      variant="contained"
                      endIcon={<SendIcon />}
                    >
                      {t(translations.checkout.actions.sendOrder)}
                    </SendOrderButton>
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

const StyledCard = styled(Card)`
  padding: 0.5em;
  height: 100%;

  & hr {
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }

  & .MuiContainer-root {
    max-height: 45vh;
  }
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
`;

const SendOrderButton = styled(Button)`
  align-self: flex-end;
  justify-self: flex-end;
`;