import Image from "next/image";
import Link from "next/link";
import { StaggerGrid, StaggerItem } from "@/components/motion/stagger-grid";
import type { Category } from "@/lib/db/entities/category.entity";

const CATEGORY_IMAGES: Record<string, string> = {
  "kitchen-home":
    "https://images.unsplash.com/photo-1616241673111-508b4662c707?q=80&w=900&auto=format&fit=crop",
  "style-accessories":
    "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=900&auto=format&fit=crop",
  "tech-everyday-carry":
    "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?q=80&w=900&auto=format&fit=crop",
};

export function FeaturedCategories({ categories }: { categories: Category[] }) {
  return (
    <StaggerGrid className="grid gap-4 sm:grid-cols-3">
      {categories.map((category) => (
        <StaggerItem key={category.id}>
          <Link
            href={`/products?category=${category.slug}`}
            className="group relative block aspect-4/3 overflow-hidden rounded-md border border-border"
          >
            <Image
              src={CATEGORY_IMAGES[category.slug] ?? category.products?.[0]?.imageUrl ?? ""}
              alt={category.name}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-heading text-xl font-semibold text-background">
                {category.name}
              </h3>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
