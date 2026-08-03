import "reflect-metadata";
import { config } from "dotenv";

config({ path: ".env.local" });
config();

import { DataSource } from "typeorm";
import { createDataSourceOptions } from "./orm-config";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
}

const AppDataSource = new DataSource({
  ...createDataSourceOptions(databaseUrl),
  migrations: ["src/lib/db/migrations/*.ts"],
});

export default AppDataSource;
