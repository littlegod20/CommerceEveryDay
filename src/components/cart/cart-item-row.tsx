import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPriceFromCents } from "@/lib/format";
import type { CartItemDto } from "@/lib/cart/dto";

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
  disabled,
}: {
  item: CartItemDto;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-3 py-4">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
        <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-foreground">{item.name}</p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Remove item"
            disabled={disabled}
            onClick={onRemove}
          >
            <X className="size-3.5" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{formatPriceFromCents(item.priceInCents)}</p>
        <div className="mt-1 flex items-center rounded-md border border-border w-fit">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Decrease quantity"
            disabled={disabled}
            onClick={() => onQuantityChange(item.quantity - 1)}
          >
            <Minus className="size-3.5" />
          </Button>
          <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Increase quantity"
            disabled={disabled || item.quantity >= item.stock}
            onClick={() => onQuantityChange(item.quantity + 1)}
          >
            <Plus className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
