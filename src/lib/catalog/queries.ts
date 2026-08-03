import { getDataSource } from "@/lib/db/data-source";
import { Category } from "@/lib/db/entities/category.entity";
import { Product } from "@/lib/db/entities/product.entity";

export async function getCategories(): Promise<Category[]> {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Category).find({ order: { name: "ASC" } });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Category).findOneBy({ slug });
}

export async function getProducts(options?: {
  categorySlug?: string;
  limit?: number;
}): Promise<Product[]> {
  const dataSource = await getDataSource();
  const query = dataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.category", "category")
    .orderBy("product.createdAt", "DESC");

  if (options?.categorySlug) {
    query.andWhere("category.slug = :slug", { slug: options.categorySlug });
  }
  if (options?.limit) {
    query.take(options.limit);
  }

  return query.getMany();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Product).findOne({
    where: { slug },
    relations: { category: true },
  });
}
