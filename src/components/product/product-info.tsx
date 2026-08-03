import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { formatPriceFromKobo } from "@/lib/format";
import { getStockStatus } from "@/lib/catalog/stock-status";
import type { Product } from "@/lib/db/entities/product.entity";

export function ProductInfo({ product }: { product: Product }) {
  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href={`/products?category=${product.category.slug}`}
          className="text-sm font-medium uppercase tracking-wide text-primary hover:underline"
        >
          {product.category.name}
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          {product.name}
        </h1>
        <p className="text-xl font-medium text-primary">
          {formatPriceFromKobo(product.priceInKobo)}
        </p>
      </div>

      <Badge
        variant={stockStatus.kind === "out-of-stock" ? "secondary" : "outline"}
        className={
          stockStatus.kind === "low-stock" ? "border-accent text-accent-foreground bg-accent/20" : ""
        }
      >
        {stockStatus.label}
      </Badge>

      <p className="max-w-prose leading-relaxed text-muted-foreground">{product.description}</p>

      <AddToCartButton productId={product.id} productName={product.name} stock={product.stock} />
    </div>
  );
}
