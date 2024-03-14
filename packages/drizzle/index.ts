import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "@repo/env";

type DBType = PostgresJsDatabase<typeof schema>;
declare global {
  // biome-ignore lint/style/noVar: <explanation>
  var db: DBType | undefined;
}

// biome-ignore lint/suspicious/noRedeclare: <explanation>
let db: DBType;
export const client = postgres(env.DATABASE_URL);
const config = {
  schema,
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
};

if (env.NODE_ENV === "production") {
  db = drizzle(client, config);
} else {
  if (!global.db) global.db = drizzle(client, config);

  db = global.db;
}

export { db };
export * from "./schema";
export * from "drizzle-orm";
export * from "drizzle-kit";
