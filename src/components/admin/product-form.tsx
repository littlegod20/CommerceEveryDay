"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/auth/submit-button";
import type { ProductFormState } from "@/lib/admin/products/actions";

type ProductFormAction = (
  state: ProductFormState,
  formData: FormData,
) => Promise<ProductFormState>;

export type CategoryOption = { id: string; name: string };

export type ProductFormValues = {
  name: string;
  slug: string;
  description: string;
  priceInCents: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
};

export function ProductForm({
  action,
  categories,
  product,
  submitLabel,
}: {
  action: ProductFormAction;
  categories: CategoryOption[];
  product?: ProductFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={product?.name} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={product?.slug}
          placeholder="Leave blank to generate from name"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product ? (product.priceInCents / 100).toFixed(2) : undefined}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            step="1"
            min="0"
            defaultValue={product?.stock}
            required
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={product?.imageUrl}
          placeholder="https://images.unsplash.com/..."
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="categoryId">Category</Label>
        <Select name="categoryId" defaultValue={product?.categoryId}>
          <SelectTrigger id="categoryId" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}
