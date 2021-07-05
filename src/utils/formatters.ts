import { Address } from 'types/User';

/** Currency formatter */
export function CurrencyFormatter(): Intl.NumberFormat {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
  });
}

export function formatAddress(address: Address): string {
  if (!address) {
    return '';
  }
  return `${address.street}, ${address.zipCode} ${address.city}`;
}
