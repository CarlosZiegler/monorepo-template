import type { Config } from "drizzle-kit";

import { env } from "@repo/env";

export default {
  schema: "./migrations/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
