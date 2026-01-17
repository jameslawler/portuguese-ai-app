import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";

export const getResources = async (db: DrizzleClient) =>
  db.select().from(schema.resources).all();

export const getResource = async (db: DrizzleClient, id: string) =>
  db.select().from(schema.resources).where(eq(schema.resources.id, id)).get();
