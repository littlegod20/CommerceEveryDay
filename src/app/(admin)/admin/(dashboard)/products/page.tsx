import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductDeleteButton } from "@/components/admin/product-delete-button";
import { formatPriceFromCents } from "@/lib/format";
import { getAllProductsForAdmin } from "@/lib/admin/products/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await getAllProductsForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="size-4" />
            New Product
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative size-10 overflow-hidden rounded-md border border-border bg-muted">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-muted-foreground">{product.category.name}</TableCell>
                <TableCell>{formatPriceFromCents(product.priceInCents)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" asChild aria-label={`Edit ${product.name}`}>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <SquarePen className="size-4" />
                      </Link>
                    </Button>
                    <ProductDeleteButton productId={product.id} productName={product.name} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
