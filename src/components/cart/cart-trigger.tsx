import { CartDrawer } from "@/components/cart/cart-drawer";
import { getCart } from "@/lib/cart/queries";

export async function CartTrigger() {
  const cart = await getCart();
  return <CartDrawer cart={cart} />;
}
