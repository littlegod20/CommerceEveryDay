import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { formatPriceFromCents } from "@/lib/format";
import type { Order } from "@/lib/db/entities/order.entity";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function OrderDetail({ order }: { order: Order }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
          <p className="text-sm text-muted-foreground">{dateFormatter.format(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="rounded-md border border-border">
        <ul className="divide-y divide-border">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{item.productName}</p>
                <p className="text-sm text-muted-foreground">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-foreground">
                {formatPriceFromCents(item.priceInCentsAtPurchase * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-border p-4 text-base font-semibold text-foreground">
          <span>Total</span>
          <span>{formatPriceFromCents(order.totalInCents)}</span>
        </div>
      </div>

      <div className="rounded-md border border-border p-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Shipping To
        </h2>
        <p className="mt-2 text-sm text-foreground">{order.shippingName}</p>
        <p className="text-sm text-foreground">{order.shippingAddress}</p>
        <p className="text-sm text-foreground">{order.shippingPhone}</p>
      </div>
    </div>
  );
}
