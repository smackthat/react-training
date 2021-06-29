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

export function CheckoutPage() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const cart = useSelector(selectCart);

  const steps = React.useMemo(
    () => [
      t(translations.checkout.steps.delivery),
      t(translations.checkout.steps.billing),
      t(translations.checkout.steps.review),
    ],
    [t],
  );

  return (
    <PageWrapper>
      <Wrapper>
        <StyledPaper>
          <>
            {cart && cart.items.length === 0 && (
              <Typography>
                No items in your shopping cart. Please add products first to
                proceed to checkout.
              </Typography>
            )}
            {cart && cart.items.length > 0 && (
              <>
                <Typography>Checkout</Typography>

                <Stepper activeStep={activeStep}>
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </>
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
