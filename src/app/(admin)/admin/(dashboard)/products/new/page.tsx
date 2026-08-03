import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/product-form";
import { createProductAction } from "@/lib/admin/products/actions";
import { getCategories } from "@/lib/catalog/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "New Product" };

export default async function NewProductPage() {
  const categories = await getCategories();
  const categoryOptions = categories.map((category) => ({ id: category.id, name: category.name }));

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold">New Product</h1>
      <ProductForm
        action={createProductAction}
        categories={categoryOptions}
        submitLabel="Create Product"
      />
    </div>
  );
}
