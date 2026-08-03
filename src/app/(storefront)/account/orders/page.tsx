import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SectionHeader } from "@/components/layout/section-header";
import { OrderList } from "@/components/orders/order-list";
import { auth } from "@/lib/auth/auth";
import { getOrdersForUser } from "@/lib/orders/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Order History" };

export default async function OrderHistoryPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/account/login");
  }

  const orders = await getOrdersForUser(session.user.id);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Account" title="Order History" />
      <OrderList orders={orders} />
    </div>
  );
}
