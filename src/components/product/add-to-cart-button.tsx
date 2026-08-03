"use client";

import { useState, useTransition } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addToCartAction } from "@/lib/cart/actions";

export function AddToCartButton({
  productId,
  productName,
  stock,
}: {
  productId: string;
  productName: string;
  stock: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const outOfStock = stock <= 0;

  function handleAddToCart() {
    startTransition(async () => {
      await addToCartAction(productId, quantity);
      toast.success(`Added ${quantity} × ${productName} to cart`);
      setQuantity(1);
    });
  }

  if (outOfStock) {
    return (
      <Button size="lg" disabled className="gap-2">
        <ShoppingBag className="size-4" />
        Out of stock
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-md border border-border">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <Button size="lg" className="gap-2" disabled={isPending} onClick={handleAddToCart}>
        <ShoppingBag className="size-4" />
        {isPending ? "Adding…" : "Add to Cart"}
      </Button>
    </div>
  );
}
