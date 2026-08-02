import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartTrigger() {
  return (
    <Button variant="ghost" size="icon" aria-label="Cart">
      <ShoppingBag className="size-5" />
    </Button>
  );
}
