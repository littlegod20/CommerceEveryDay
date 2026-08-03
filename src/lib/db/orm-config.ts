import type { DataSourceOptions } from "typeorm";
import pg from "pg";
import { Category, Product, User, Cart, CartItem, Order, OrderItem } from "./entities";

export function createDataSourceOptions(databaseUrl: string): DataSourceOptions {
  const requiresSsl = /neon\.tech|sslmode=require/.test(databaseUrl);

  return {
    type: "postgres",
    url: databaseUrl,
    // TypeORM otherwise loads the driver via `require("pg")` with the
    // module name passed as a variable, which bundlers/tracers (Turbopack,
    // Vercel's @vercel/nft) can't see statically — supplying it directly
    // avoids that dynamic-require path entirely.
    driver: pg,
    ssl: requiresSsl ? { rejectUnauthorized: false } : false,
    entities: [Category, Product, User, Cart, CartItem, Order, OrderItem],
    synchronize: false,
    logging: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  };
}
