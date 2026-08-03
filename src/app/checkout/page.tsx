import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SectionHeader } from "@/components/layout/section-header";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { auth } from "@/lib/auth/auth";
import { getCart } from "@/lib/cart/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/account/login?callbackUrl=/checkout");
  }

  const cart = await getCart();
  if (cart.items.length === 0) {
    redirect("/products");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Checkout" title="Complete Your Order" />
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <CheckoutForm />
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
}
