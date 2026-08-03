import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import type { OrderItem } from "./order-item.entity";

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, { onDelete: "RESTRICT", nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ name: "total_in_cents", type: "integer" })
  totalInCents!: number;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Index({ unique: true })
  @Column({ name: "paystack_reference", type: "varchar", length: 100 })
  paystackReference!: string;

  @Column({ name: "shipping_name", type: "varchar", length: 160 })
  shippingName!: string;

  @Column({ name: "shipping_address", type: "text" })
  shippingAddress!: string;

  @Column({ name: "shipping_phone", type: "varchar", length: 32 })
  shippingPhone!: string;

  @OneToMany("OrderItem", "order", { cascade: true })
  items!: OrderItem[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
