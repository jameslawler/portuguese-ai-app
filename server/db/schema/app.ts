import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const plans = sqliteTable("plans", {
  id: text("id").primaryKey(),
  name: text("name"),
  nodes: text("nodes"),
  isHomePlan: integer("is_home_plan", { mode: "boolean" })
    .notNull()
    .default(false),
});
