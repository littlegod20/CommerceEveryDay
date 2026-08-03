import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { updateProductAction } from "@/lib/admin/products/actions";
import { getProductForEdit } from "@/lib/admin/products/queries";
import { getCategories } from "@/lib/catalog/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Edit Product" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductForEdit(id), getCategories()]);

  if (!product) {
    notFound();
  }

  const updateThisProduct = updateProductAction.bind(null, product.id);
  const categoryOptions = categories.map((category) => ({ id: category.id, name: category.name }));

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold">Edit Product</h1>
      <ProductForm
        action={updateThisProduct}
        categories={categoryOptions}
        product={{
          name: product.name,
          slug: product.slug,
          description: product.description,
          priceInCents: product.priceInCents,
          stock: product.stock,
          imageUrl: product.imageUrl,
          categoryId: product.categoryId,
        }}
        submitLabel="Save Changes"
      />
    </div>
  );
}
