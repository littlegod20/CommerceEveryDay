import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-heading text-xl font-semibold tracking-tight leading-none",
        className,
      )}
    >
      <span className="text-foreground">Commerce</span>
      <span className="text-primary">EveryDay</span>
    </Link>
  );
}
