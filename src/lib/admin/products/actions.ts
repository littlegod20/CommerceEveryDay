"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDataSource } from "@/lib/db/data-source";
import { Product } from "@/lib/db/entities/product.entity";
import { slugify } from "@/lib/slugify";

export type ProductFormState = { error?: string } | undefined;

function parseProductForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const priceDollars = String(formData.get("price") ?? "").trim();
  const stockRaw = String(formData.get("stock") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  if (!name || !description || !imageUrl || !categoryId || !priceDollars || !stockRaw) {
    return { error: "All fields are required." } as const;
  }

  const price = Number(priceDollars);
  const stock = Number(stockRaw);
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Price must be a positive number." } as const;
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return { error: "Stock must be a non-negative whole number." } as const;
  }

  return {
    data: {
      name,
      description,
      imageUrl,
      categoryId,
      priceInCents: Math.round(price * 100),
      stock,
      slug: slugify(slugInput || name),
    },
  } as const;
}

export async function createProductAction(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const parsed = parseProductForm(formData);
  if ("error" in parsed) {
    return parsed;
  }

  const dataSource = await getDataSource();
  const productRepo = dataSource.getRepository(Product);

  const existing = await productRepo.findOneBy({ slug: parsed.data.slug });
  if (existing) {
    return { error: "A product with that slug already exists." };
  }

  await productRepo.save(productRepo.create(parsed.data));
  revalidatePath("/admin/products");
  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function updateProductAction(
  productId: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const parsed = parseProductForm(formData);
  if ("error" in parsed) {
    return parsed;
  }

  const dataSource = await getDataSource();
  const productRepo = dataSource.getRepository(Product);

  const existing = await productRepo.findOneBy({ slug: parsed.data.slug });
  if (existing && existing.id !== productId) {
    return { error: "A product with that slug already exists." };
  }

  await productRepo.update({ id: productId }, parsed.data);
  revalidatePath("/admin/products");
  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function deleteProductAction(productId: string): Promise<{ error?: string }> {
  const dataSource = await getDataSource();
  try {
    await dataSource.getRepository(Product).delete({ id: productId });
  } catch {
    return { error: "This product can't be deleted because it appears in existing orders." };
  }
  revalidatePath("/admin/products");
  revalidatePath("/", "layout");
  return {};
}
