import type { Metadata } from "next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { formatPriceFromCents } from "@/lib/format";
import { getAllOrdersForAdmin } from "@/lib/admin/orders/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Orders" };

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" });

export default async function AdminOrdersPage() {
  const orders = await getAllOrdersForAdmin();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold">Orders</h1>

      {orders.length === 0 ? (
        <p className="rounded-md border border-dashed border-border p-10 text-center text-muted-foreground">
          No orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    <div>{order.user.name}</div>
                    <div className="text-sm text-muted-foreground">{order.user.email}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {dateFormatter.format(order.createdAt)}
                  </TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPriceFromCents(order.totalInCents)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
