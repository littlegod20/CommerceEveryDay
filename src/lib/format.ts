const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPriceFromCents(priceInCents: number): string {
  return usdFormatter.format(priceInCents / 100);
}
