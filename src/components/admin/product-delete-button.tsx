"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteProductAction } from "@/lib/admin/products/actions";

export function ProductDeleteButton({ productId, productName }: { productId: string; productName: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm(`Delete "${productName}"? This can't be undone.`)) {
      return;
    }
    startTransition(async () => {
      const result = await deleteProductAction(productId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${productName} deleted.`);
      }
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={`Delete ${productName}`}
      disabled={isPending}
      onClick={handleDelete}
    >
      <Trash2 className="size-4" />
    </Button>
  );
}
