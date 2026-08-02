import "reflect-metadata";
import { DataSource } from "typeorm";
import { createDataSourceOptions } from "./orm-config";

// Cache the DataSource on globalThis so hot-reload in dev and repeated
// serverless invocations reuse the same connection pool instead of
// exhausting Neon's connection limit.
const globalForDataSource = globalThis as unknown as {
  dataSource?: DataSource;
  dataSourceInit?: Promise<DataSource>;
};

export async function getDataSource(): Promise<DataSource> {
  if (globalForDataSource.dataSource?.isInitialized) {
    return globalForDataSource.dataSource;
  }

  if (!globalForDataSource.dataSourceInit) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
    }

    const dataSource = new DataSource(createDataSourceOptions(databaseUrl));
    globalForDataSource.dataSource = dataSource;
    globalForDataSource.dataSourceInit = dataSource.initialize();
  }

  return globalForDataSource.dataSourceInit;
}
