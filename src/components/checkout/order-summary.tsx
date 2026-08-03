import Image from "next/image";
import { formatPriceFromCents } from "@/lib/format";
import type { CartDto } from "@/lib/cart/dto";

export function OrderSummary({ cart }: { cart: CartDto }) {
  return (
    <div className="rounded-md border border-border p-6">
      <h2 className="font-heading text-lg font-semibold text-foreground">Order Summary</h2>
      <ul className="mt-4 divide-y divide-border">
        {cart.items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
              <Image src={item.imageUrl} alt={item.name} fill sizes="56px" className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">Qty {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-foreground">
              {formatPriceFromCents(item.priceInCents * item.quantity)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-base font-semibold text-foreground">
        <span>Total</span>
        <span>{formatPriceFromCents(cart.subtotalInCents)}</span>
      </div>
    </div>
  );
}
