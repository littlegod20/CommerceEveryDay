import { getDataSource } from "@/lib/db/data-source";
import { Cart } from "@/lib/db/entities/cart.entity";
import { getCartSessionId } from "@/lib/cart/session";
import { EMPTY_CART, type CartDto } from "@/lib/cart/dto";

export async function findCartEntityBySessionId(sessionId: string): Promise<Cart | null> {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Cart).findOne({
    where: { sessionId },
    relations: { items: { product: true } },
  });
}

export async function getCart(): Promise<CartDto> {
  const sessionId = await getCartSessionId();
  if (!sessionId) {
    return EMPTY_CART;
  }

  const cart = await findCartEntityBySessionId(sessionId);
  if (!cart) {
    return EMPTY_CART;
  }

  const items = cart.items.map((item) => ({
    id: item.id,
    productId: item.product.id,
    name: item.product.name,
    slug: item.product.slug,
    imageUrl: item.product.imageUrl,
    priceInKobo: item.product.priceInKobo,
    quantity: item.quantity,
    stock: item.product.stock,
  }));

  return {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotalInKobo: items.reduce((sum, item) => sum + item.priceInKobo * item.quantity, 0),
  };
}
