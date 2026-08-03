"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Receipt, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: Receipt },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col justify-between border-b border-sidebar-border bg-sidebar text-sidebar-foreground md:h-screen md:w-60 md:border-b-0 md:border-r">
      <div>
        <div className="px-5 py-5">
          <span className="font-heading text-lg font-semibold">
            Commerce<span className="text-sidebar-primary">EveryDay</span>
          </span>
          <p className="text-xs text-sidebar-foreground/60">Admin</p>
        </div>
        <nav className="flex flex-row gap-1 px-3 md:flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="space-y-1 p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          <Store className="size-4" />
          View Store
        </Link>
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
