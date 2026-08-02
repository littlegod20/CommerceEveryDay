import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { NAV_LINKS } from "@/lib/nav-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <Logo className="text-secondary-foreground [&_span:first-child]:text-secondary-foreground [&_span:last-child]:text-accent" />
          <p className="max-w-xs text-sm text-secondary-foreground/70">
            A demo storefront for everyday essentials — kitchen, style, and
            tech — built to show what a real client site can look like.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
            Shop
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-secondary-foreground/80 hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
            Account
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/account/orders" className="text-secondary-foreground/80 hover:text-accent">
                Order History
              </Link>
            </li>
            <li>
              <Link href="/account/login" className="text-secondary-foreground/80 hover:text-accent">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 py-6 text-center text-xs text-secondary-foreground/60">
        © {new Date().getFullYear()} CommerceEveryDay. Demo storefront — no real orders are fulfilled.
      </div>
    </footer>
  );
}
