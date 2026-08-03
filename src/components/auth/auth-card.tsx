import type { ReactNode } from "react";
import Link from "next/link";

export function AuthCard({
  title,
  description,
  footer,
  children,
}: {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-md border border-border bg-card p-8">
        <h1 className="font-heading text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6">{children}</div>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
    </div>
  );
}

export function AuthSwitchLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="font-medium text-primary hover:underline">
      {label}
    </Link>
  );
}
