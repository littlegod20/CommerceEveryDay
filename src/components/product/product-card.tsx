import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPriceFromCents } from "@/lib/format";
import { getStockStatus } from "@/lib/catalog/stock-status";
import type { Product } from "@/lib/db/entities/product.entity";

export function ProductCard({ product }: { product: Product }) {
  const stockStatus = getStockStatus(product.stock);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-md border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-primary)]"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {stockStatus.kind === "out-of-stock" ? (
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 bg-foreground text-background"
          >
            {stockStatus.label}
          </Badge>
        ) : stockStatus.kind === "low-stock" ? (
          <Badge className="absolute left-2 top-2 bg-accent text-accent-foreground">
            {stockStatus.label}
          </Badge>
        ) : null}
      </div>
      <div className="space-y-1 p-4">
        {product.category ? (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.category.name}
          </p>
        ) : null}
        <h3 className="font-heading text-base font-semibold text-foreground">{product.name}</h3>
        <p className="text-sm font-medium text-primary">{formatPriceFromCents(product.priceInCents)}</p>
      </div>
    </Link>
  );
}
