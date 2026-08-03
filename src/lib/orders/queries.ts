import { getDataSource } from "@/lib/db/data-source";
import { Order } from "@/lib/db/entities/order.entity";

export async function getOrdersForUser(userId: string): Promise<Order[]> {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Order).find({
    where: { userId },
    order: { createdAt: "DESC" },
  });
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Order).findOne({
    where: { id: orderId },
    relations: { items: true },
  });
}
