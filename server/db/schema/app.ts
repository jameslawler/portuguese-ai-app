import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export type ResourceItem = {
  group: "free" | "premium";
  name: string;
  url: string;
  type: "article" | "video";
};

export const resources = sqliteTable("resources", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  markdown: text("markdown").notNull(),
  links: text("links", { mode: "json" }).$type<ResourceItem[]>(),
});

export const lessons = sqliteTable("lessons", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  markdown: text("markdown").notNull(),
});

export const plans = sqliteTable("plans", {
  id: text("id").primaryKey(),
  name: text("name"),
  nodes: text("nodes"),
  isHomePlan: integer("is_home_plan", { mode: "boolean" })
    .notNull()
    .default(false),
});
