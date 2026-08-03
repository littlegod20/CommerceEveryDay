import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SectionHeader } from "@/components/layout/section-header";
import { OrderDetail } from "@/components/orders/order-detail";
import { auth } from "@/lib/auth/auth";
import { getOrderById } from "@/lib/orders/queries";
import { OrderStatus } from "@/lib/db/entities/order.entity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Order Confirmation" };

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/account/login");
  }

  const { id } = await params;
  const order = await getOrderById(id);

  if (!order || order.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Order"
        title={order.status === OrderStatus.PAID ? "Thank You For Your Order" : "Order Status"}
        description={
          order.status === OrderStatus.PAID
            ? "A confirmation has been recorded on your account."
            : undefined
        }
      />
      <div className="mt-8">
        <OrderDetail order={order} />
      </div>
    </div>
  );
}
