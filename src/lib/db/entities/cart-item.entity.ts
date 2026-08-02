import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity({ name: "cart_items" })
@Unique(["cartId", "productId"])
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cart_id" })
  cart!: Cart;

  @Column({ name: "cart_id", type: "uuid" })
  cartId!: string;

  @ManyToOne(() => Product, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ name: "product_id", type: "uuid" })
  productId!: string;

  @Column({ type: "integer" })
  quantity!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
