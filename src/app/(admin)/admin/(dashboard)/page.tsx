import type { Metadata } from "next";
import Link from "next/link";
import { getDataSource } from "@/lib/db/data-source";
import { Product } from "@/lib/db/entities/product.entity";
import { Order, OrderStatus } from "@/lib/db/entities/order.entity";
import { formatPriceFromCents } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Dashboard" };

async function getDashboardStats() {
  const dataSource = await getDataSource();
  const productRepo = dataSource.getRepository(Product);
  const orderRepo = dataSource.getRepository(Order);

  const [productCount, orderCount, paidOrders] = await Promise.all([
    productRepo.count(),
    orderRepo.count(),
    orderRepo.find({ where: { status: OrderStatus.PAID } }),
  ]);

  const revenueInCents = paidOrders.reduce((sum, order) => sum + order.totalInCents, 0);

  return { productCount, orderCount, revenueInCents };
}

export default async function AdminDashboardPage() {
  const { productCount, orderCount, revenueInCents } = await getDashboardStats();

  const stats = [
    { label: "Products", value: productCount.toString(), href: "/admin/products" },
    { label: "Orders", value: orderCount.toString(), href: "/admin/orders" },
    { label: "Revenue (Paid Orders)", value: formatPriceFromCents(revenueInCents) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const content = (
            <div className="rounded-md border border-border p-6">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="mt-2 font-heading text-3xl font-semibold text-foreground">
                {stat.value}
              </p>
            </div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href} className="transition-opacity hover:opacity-80">
              {content}
            </Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
