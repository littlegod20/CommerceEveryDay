import { getDataSource } from "@/lib/db/data-source";
import { Order } from "@/lib/db/entities/order.entity";

export async function getAllOrdersForAdmin(): Promise<Order[]> {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Order).find({
    relations: { user: true, items: true },
    order: { createdAt: "DESC" },
  });
}
