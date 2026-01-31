import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema/index.ts",
  out: "./migrations",
  driver: "d1-http",
  dialect: "sqlite",
} satisfies Config;
