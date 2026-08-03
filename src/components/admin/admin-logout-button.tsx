"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { adminLogoutAction } from "@/lib/auth/admin-actions";

export function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => adminLogoutAction())}
      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground disabled:opacity-50"
    >
      <LogOut className="size-4" />
      Sign Out
    </button>
  );
}
