import { getDataSource } from "@/lib/db/data-source";
import { Product } from "@/lib/db/entities/product.entity";

export async function getAllProductsForAdmin(): Promise<Product[]> {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Product).find({
    relations: { category: true },
    order: { createdAt: "DESC" },
  });
}

export async function getProductForEdit(id: string): Promise<Product | null> {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Product).findOne({
    where: { id },
    relations: { category: true },
  });
}
