export type StockStatus =
  | { kind: "out-of-stock"; label: string }
  | { kind: "low-stock"; label: string }
  | { kind: "in-stock"; label: string };

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) {
    return { kind: "out-of-stock", label: "Out of stock" };
  }
  if (stock <= 5) {
    return { kind: "low-stock", label: `Only ${stock} left` };
  }
  return { kind: "in-stock", label: "In stock" };
}
