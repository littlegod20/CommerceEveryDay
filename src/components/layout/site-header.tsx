import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AccountMenu } from "@/components/layout/account-menu";
import { NAV_LINKS } from "@/lib/nav-links";
import { CartTrigger } from "@/components/cart/cart-trigger";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <MobileNav />
        <Logo className="mr-2" />
        <nav className="hidden md:flex md:items-center md:gap-1 md:ml-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <AccountMenu />
          <CartTrigger />
        </div>
      </div>
    </header>
  );
}
