import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";

export const getLessons = async (db: DrizzleClient) =>
  db.select().from(schema.lessons).all();

export const getLesson = async (db: DrizzleClient, id: string) =>
  db.select().from(schema.lessons).where(eq(schema.lessons.id, id)).get();
