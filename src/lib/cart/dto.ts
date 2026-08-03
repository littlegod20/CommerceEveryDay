export type CartItemDto = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  imageUrl: string;
  priceInKobo: number;
  quantity: number;
  stock: number;
};

export type CartDto = {
  items: CartItemDto[];
  itemCount: number;
  subtotalInKobo: number;
};

export const EMPTY_CART: CartDto = { items: [], itemCount: 0, subtotalInKobo: 0 };
