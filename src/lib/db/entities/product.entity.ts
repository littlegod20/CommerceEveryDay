import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 160 })
  name!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 180 })
  slug!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ name: "price_in_cents", type: "integer" })
  priceInCents!: number;

  @Column({ name: "image_url", type: "text" })
  imageUrl!: string;

  @Column({ type: "integer", default: 0 })
  stock!: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "RESTRICT",
    nullable: false,
  })
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @Column({ name: "category_id", type: "uuid" })
  categoryId!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
