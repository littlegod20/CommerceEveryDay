"use server";

import { revalidatePath } from "next/cache";
import { getDataSource } from "@/lib/db/data-source";
import { Cart } from "@/lib/db/entities/cart.entity";
import { CartItem } from "@/lib/db/entities/cart-item.entity";
import { Product } from "@/lib/db/entities/product.entity";
import { getOrCreateCartSessionId } from "@/lib/cart/session";

async function getOrCreateCart(sessionId: string): Promise<Cart> {
  const dataSource = await getDataSource();
  const cartRepo = dataSource.getRepository(Cart);

  const existing = await cartRepo.findOneBy({ sessionId });
  if (existing) {
    return existing;
  }
  return cartRepo.save(cartRepo.create({ sessionId }));
}

export async function addToCartAction(productId: string, quantity: number) {
  const sessionId = await getOrCreateCartSessionId();
  const dataSource = await getDataSource();

  await dataSource.transaction(async (manager) => {
    const product = await manager.findOneByOrFail(Product, { id: productId });
    const cart = await getOrCreateCart(sessionId);

    const itemRepo = manager.getRepository(CartItem);
    const existingItem = await itemRepo.findOneBy({ cartId: cart.id, productId });
    const nextQuantity = Math.min(
      (existingItem?.quantity ?? 0) + quantity,
      product.stock,
    );

    if (nextQuantity <= 0) {
      return;
    }

    if (existingItem) {
      existingItem.quantity = nextQuantity;
      await itemRepo.save(existingItem);
    } else {
      await itemRepo.save(itemRepo.create({ cartId: cart.id, productId, quantity: nextQuantity }));
    }
  });

  revalidatePath("/", "layout");
}

export async function updateCartItemQuantityAction(cartItemId: string, quantity: number) {
  const dataSource = await getDataSource();

  await dataSource.transaction(async (manager) => {
    const itemRepo = manager.getRepository(CartItem);
    const item = await itemRepo.findOne({ where: { id: cartItemId }, relations: { product: true } });
    if (!item) {
      return;
    }

    if (quantity <= 0) {
      await itemRepo.remove(item);
      return;
    }

    item.quantity = Math.min(quantity, item.product.stock);
    await itemRepo.save(item);
  });

  revalidatePath("/", "layout");
}

export async function removeCartItemAction(cartItemId: string) {
  const dataSource = await getDataSource();
  await dataSource.getRepository(CartItem).delete({ id: cartItemId });
  revalidatePath("/", "layout");
}
