import { translations } from './../locales/translations';
import { TFunction } from 'i18next';

export enum BillingMethod {
  Invoice,
  Credit,
  Cash,
}

export function BillingMethodToString(
  billingMethod: BillingMethod,
  t: TFunction,
) {
  switch (billingMethod) {
    case BillingMethod.Cash:
      return t(translations.checkout.billing.billingMethod.cash);
    case BillingMethod.Credit:
      return t(translations.checkout.billing.billingMethod.credit);
    case BillingMethod.Invoice:
      return t(translations.checkout.billing.billingMethod.invoice);
    default:
      return '';
  }
}
