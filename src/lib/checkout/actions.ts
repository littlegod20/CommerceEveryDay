"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/auth";
import { getDataSource } from "@/lib/db/data-source";
import { Order, OrderStatus } from "@/lib/db/entities/order.entity";
import { OrderItem } from "@/lib/db/entities/order-item.entity";
import { CartItem } from "@/lib/db/entities/cart-item.entity";
import { Product } from "@/lib/db/entities/product.entity";
import { findCartEntityBySessionId } from "@/lib/cart/queries";
import { getCartSessionId } from "@/lib/cart/session";
import { verifyPaystackTransaction } from "@/lib/paystack/client";

export type InitCheckoutInput = {
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
};

export type InitCheckoutResult =
  | { success: true; orderId: string; reference: string; amountInCents: number; email: string }
  | { success: false; error: string };

export async function initCheckoutAction(input: InitCheckoutInput): Promise<InitCheckoutResult> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: "You must be signed in to check out." };
  }

  const shippingName = input.shippingName.trim();
  const shippingAddress = input.shippingAddress.trim();
  const shippingPhone = input.shippingPhone.trim();
  if (!shippingName || !shippingAddress || !shippingPhone) {
    return { success: false, error: "All shipping fields are required." };
  }

  const cartSessionId = await getCartSessionId();
  const cart = cartSessionId ? await findCartEntityBySessionId(cartSessionId) : null;
  if (!cart || cart.items.length === 0) {
    return { success: false, error: "Your cart is empty." };
  }

  for (const item of cart.items) {
    if (item.quantity > item.product.stock) {
      return {
        success: false,
        error: `${item.product.name} only has ${item.product.stock} left in stock.`,
      };
    }
  }

  const totalInCents = cart.items.reduce(
    (sum, item) => sum + item.product.priceInCents * item.quantity,
    0,
  );
  const reference = `ceday_${randomUUID()}`;

  const dataSource = await getDataSource();
  const orderId = await dataSource.transaction(async (manager) => {
    const orderRepo = manager.getRepository(Order);
    const order = await orderRepo.save(
      orderRepo.create({
        userId: session.user.id,
        totalInCents,
        status: OrderStatus.PENDING,
        paystackReference: reference,
        shippingName,
        shippingAddress,
        shippingPhone,
      }),
    );

    const itemRepo = manager.getRepository(OrderItem);
    await itemRepo.save(
      cart.items.map((item) =>
        itemRepo.create({
          orderId: order.id,
          productId: item.product.id,
          productName: item.product.name,
          priceInCentsAtPurchase: item.product.priceInCents,
          quantity: item.quantity,
        }),
      ),
    );

    return order.id;
  });

  return {
    success: true,
    orderId,
    reference,
    amountInCents: totalInCents,
    email: session.user.email ?? "",
  };
}

export async function verifyCheckoutAction(
  orderId: string,
  reference: string,
): Promise<{ success: boolean; error?: string }> {
  const dataSource = await getDataSource();
  const orderRepo = dataSource.getRepository(Order);
  const order = await orderRepo.findOne({ where: { id: orderId }, relations: { items: true } });

  if (!order || order.paystackReference !== reference) {
    return { success: false, error: "Order not found." };
  }
  if (order.status === OrderStatus.PAID) {
    return { success: true };
  }

  const verification = await verifyPaystackTransaction(reference);
  if (verification.status !== "success" || verification.amount !== order.totalInCents) {
    order.status = OrderStatus.FAILED;
    await orderRepo.save(order);
    return { success: false, error: "Payment verification failed." };
  }

  const cartSessionId = await getCartSessionId();
  const cart = cartSessionId ? await findCartEntityBySessionId(cartSessionId) : null;

  await dataSource.transaction(async (manager) => {
    for (const item of order.items) {
      await manager
        .createQueryBuilder()
        .update(Product)
        .set({ stock: () => `GREATEST(stock - ${item.quantity}, 0)` })
        .where("id = :id", { id: item.productId })
        .execute();
    }

    order.status = OrderStatus.PAID;
    await manager.getRepository(Order).save(order);

    if (cart) {
      await manager.getRepository(CartItem).delete({ cartId: cart.id });
    }
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export async function cancelCheckoutAction(orderId: string): Promise<void> {
  const dataSource = await getDataSource();
  const orderRepo = dataSource.getRepository(Order);
  const order = await orderRepo.findOneBy({ id: orderId });
  if (order && order.status === OrderStatus.PENDING) {
    await orderRepo.delete({ id: orderId });
  }
}
