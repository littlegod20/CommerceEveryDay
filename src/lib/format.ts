const ghsFormatter = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
});

export function formatPriceFromCents(priceInCents: number): string {
  return ghsFormatter.format(priceInCents / 100);
}
