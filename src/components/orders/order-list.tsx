import Link from "next/link";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { formatPriceFromCents } from "@/lib/format";
import type { Order } from "@/lib/db/entities/order.entity";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export function OrderList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-border p-10 text-center text-muted-foreground">
        No orders yet. Once you check out, your orders will show up here.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border rounded-md border border-border">
      {orders.map((order) => (
        <li key={order.id}>
          <Link
            href={`/orders/${order.id}/confirmation`}
            className="flex flex-wrap items-center justify-between gap-2 p-4 transition-colors hover:bg-muted"
          >
            <div>
              <p className="text-sm font-medium text-foreground">
                Order #{order.id.slice(0, 8)}
              </p>
              <p className="text-sm text-muted-foreground">
                {dateFormatter.format(order.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <OrderStatusBadge status={order.status} />
              <span className="text-sm font-medium text-foreground">
                {formatPriceFromCents(order.totalInCents)}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
