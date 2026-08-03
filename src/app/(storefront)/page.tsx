import { Hero } from "@/components/home/hero";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { SectionHeader } from "@/components/layout/section-header";
import { ProductGrid } from "@/components/product/product-grid";
import { getCategories, getProducts } from "@/lib/catalog/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getProducts({ limit: 8 }),
  ]);

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Browse"
          title="Shop by category"
          description="Three tightly-edited collections, no endless scrolling required."
        />
        <FeaturedCategories categories={categories} />
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Just in"
          title="New arrivals"
          description="Recently added to the catalog."
          viewAllHref="/products"
        />
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
