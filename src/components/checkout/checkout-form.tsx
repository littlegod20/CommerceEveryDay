"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  cancelCheckoutAction,
  initCheckoutAction,
  verifyCheckoutAction,
} from "@/lib/checkout/actions";

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";

export function CheckoutForm() {
  const router = useRouter();
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await initCheckoutAction({ shippingName, shippingAddress, shippingPhone });
      if (!result.success) {
        setError(result.error);
        return;
      }

      // Loaded dynamically so this browser-only SDK (it touches `window` at
      // import time) is never evaluated during server-side rendering.
      const { default: PaystackPop } = await import("@paystack/inline-js");
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        email: result.email,
        amount: result.amountInCents,
        currency: "USD",
        reference: result.reference,
        onSuccess: () => {
          startTransition(async () => {
            const verified = await verifyCheckoutAction(result.orderId, result.reference);
            if (verified.success) {
              router.push(`/orders/${result.orderId}/confirmation`);
            } else {
              setError(verified.error ?? "Payment verification failed.");
            }
          });
        },
        onCancel: () => {
          startTransition(() => cancelCheckoutAction(result.orderId));
        },
      });
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="shippingName">Full name</Label>
        <Input
          id="shippingName"
          value={shippingName}
          onChange={(event) => setShippingName(event.target.value)}
          autoComplete="name"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="shippingAddress">Shipping address</Label>
        <Input
          id="shippingAddress"
          value={shippingAddress}
          onChange={(event) => setShippingAddress(event.target.value)}
          autoComplete="street-address"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="shippingPhone">Phone number</Label>
        <Input
          id="shippingPhone"
          value={shippingPhone}
          onChange={(event) => setShippingPhone(event.target.value)}
          autoComplete="tel"
          required
        />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? "Processing…" : "Pay with Paystack"}
      </Button>
    </form>
  );
}
