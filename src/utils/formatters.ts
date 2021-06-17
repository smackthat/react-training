/** Currency formatter */
export function CurrencyFormatter(): Intl.NumberFormat {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
  });
}
