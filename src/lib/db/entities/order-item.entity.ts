import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity({ name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @Column({ name: "order_id", type: "uuid" })
  orderId!: string;

  @ManyToOne(() => Product, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ name: "product_id", type: "uuid" })
  productId!: string;

  /** Snapshot of the product name at purchase time, so order history stays
   *  accurate even if the product is later renamed or removed. */
  @Column({ name: "product_name", type: "varchar", length: 160 })
  productName!: string;

  @Column({ name: "price_in_kobo_at_purchase", type: "integer" })
  priceInKoboAtPurchase!: number;

  @Column({ type: "integer" })
  quantity!: number;
}
