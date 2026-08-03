import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

export function SectionHeader({
  eyebrow,
  title,
  description,
  viewAllHref,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  viewAllHref?: string;
}) {
  return (
    <FadeIn className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-sm font-medium uppercase tracking-wide text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 font-heading text-3xl font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowUpRight className="size-4" />
        </Link>
      ) : null}
    </FadeIn>
  );
}
