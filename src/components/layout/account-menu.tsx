import { AccountMenuClient } from "@/components/layout/account-menu-client";
import { auth } from "@/lib/auth/auth";

export async function AccountMenu() {
  const session = await auth();
  return <AccountMenuClient userName={session?.user?.name ?? null} />;
}
