import type { DataSourceOptions } from "typeorm";
import { Category, Product, User, Cart, CartItem, Order, OrderItem } from "./entities";

export function createDataSourceOptions(databaseUrl: string): DataSourceOptions {
  const requiresSsl = /neon\.tech|sslmode=require/.test(databaseUrl);

  return {
    type: "postgres",
    url: databaseUrl,
    ssl: requiresSsl ? { rejectUnauthorized: false } : false,
    entities: [Category, Product, User, Cart, CartItem, Order, OrderItem],
    migrations: ["src/lib/db/migrations/*.ts"],
    synchronize: false,
    logging: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  };
}
