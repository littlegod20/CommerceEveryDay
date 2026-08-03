const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatPriceFromKobo(priceInKobo: number): string {
  return nairaFormatter.format(priceInKobo / 100);
}
