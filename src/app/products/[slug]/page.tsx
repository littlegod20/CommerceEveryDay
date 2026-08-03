import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { ProductInfo } from "@/components/product/product-info";
import { getProductBySlug } from "@/lib/catalog/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? "Product not found" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <FadeIn>
          <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ProductInfo product={product} />
        </FadeIn>
      </div>
    </div>
  );
}
