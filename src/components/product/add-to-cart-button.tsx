"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({ disabled }: { disabled?: boolean }) {
  return (
    <Button size="lg" disabled={disabled} className="gap-2">
      <ShoppingBag className="size-4" />
      {disabled ? "Out of stock" : "Add to Cart"}
    </Button>
  );
}
