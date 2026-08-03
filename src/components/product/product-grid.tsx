import { StaggerGrid, StaggerItem } from "@/components/motion/stagger-grid";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/db/entities/product.entity";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-border p-10 text-center text-muted-foreground">
        No products found.
      </p>
    );
  }

  return (
    <StaggerGrid className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
