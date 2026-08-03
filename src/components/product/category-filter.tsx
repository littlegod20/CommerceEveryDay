import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/db/entities/category.entity";

export function CategoryFilter({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  const tabs = [{ slug: undefined, name: "All" }, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab.slug === activeSlug;
        return (
          <Link
            key={tab.slug ?? "all"}
            href={tab.slug ? `/products?category=${tab.slug}` : "/products"}
            className={cn(
              "rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground/80 hover:bg-muted hover:text-foreground",
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
