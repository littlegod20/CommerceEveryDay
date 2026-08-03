"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { formatPriceFromCents } from "@/lib/format";
import { removeCartItemAction, updateCartItemQuantityAction } from "@/lib/cart/actions";
import type { CartDto } from "@/lib/cart/dto";

export function CartDrawer({ cart }: { cart: CartDto }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleQuantityChange(cartItemId: string, quantity: number) {
    startTransition(async () => {
      await updateCartItemQuantityAction(cartItemId, quantity);
    });
  }

  function handleRemove(cartItemId: string) {
    startTransition(async () => {
      await removeCartItemAction(cartItemId);
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
          <ShoppingBag className="size-5" />
          {cart.itemCount > 0 ? (
            <Badge className="absolute -right-1 -top-1 size-5 justify-center rounded-md p-0 text-[11px]">
              {cart.itemCount}
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="font-heading">Your Cart</SheetTitle>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <p className="px-4 text-sm text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="flex-1 divide-y divide-border overflow-y-auto px-4">
            {cart.items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                disabled={isPending}
                onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>
        )}

        {cart.items.length > 0 ? (
          <SheetFooter className="border-t border-border">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Subtotal</span>
              <span>{formatPriceFromCents(cart.subtotalInCents)}</span>
            </div>
            <Button asChild size="lg" onClick={() => setOpen(false)}>
              <Link href="/checkout">Checkout</Link>
            </Button>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
