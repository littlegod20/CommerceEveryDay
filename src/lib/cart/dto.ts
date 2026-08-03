export type CartItemDto = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  imageUrl: string;
  priceInCents: number;
  quantity: number;
  stock: number;
};

export type CartDto = {
  items: CartItemDto[];
  itemCount: number;
  subtotalInCents: number;
};

export const EMPTY_CART: CartDto = { items: [], itemCount: 0, subtotalInCents: 0 };
