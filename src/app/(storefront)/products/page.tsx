import type { Metadata } from "next";
import { SectionHeader } from "@/components/layout/section-header";
import { CategoryFilter } from "@/components/product/category-filter";
import { ProductGrid } from "@/components/product/product-grid";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/catalog/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category } = await searchParams;
  const activeCategory = category ? await getCategoryBySlug(category) : null;
  return { title: activeCategory?.name ?? "Shop All" };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: category }),
  ]);

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Catalog"
        title={activeCategory ? activeCategory.name : "Shop All"}
        description={activeCategory?.description ?? "Everything we carry, in one place."}
      />
      <CategoryFilter categories={categories} activeSlug={category} />
      <ProductGrid products={products} />
    </div>
  );
}
