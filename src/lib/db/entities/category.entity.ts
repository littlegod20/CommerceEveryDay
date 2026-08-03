import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Product } from "./product.entity";

@Entity({ name: "categories" })
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 120 })
  name!: string;

  @Column({ type: "varchar", length: 140, unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @OneToMany("Product", "category")
  products!: Product[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
