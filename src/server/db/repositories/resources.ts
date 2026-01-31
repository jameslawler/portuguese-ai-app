import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";
import { Resource } from "../../../types/resource";

export const getResources = async (db: DrizzleClient) =>
  db.select().from(schema.resources).all();

export const getResource = async (db: DrizzleClient, id: string) =>
  db.select().from(schema.resources).where(eq(schema.resources.id, id)).get();

export const createResource = async (
  db: DrizzleClient,
  resource: Omit<Resource, "id">
) =>
  db
    .insert(schema.resources)
    .values({
      id: crypto.randomUUID(),
      title: resource.title,
      markdown: resource.markdown,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning({ id: schema.resources.id });

export const updateResource = async (db: DrizzleClient, resource: Resource) =>
  db
    .update(schema.resources)
    .set({
      title: resource.title,
      markdown: resource.markdown,
      updatedAt: Date.now(),
    })
    .where(eq(schema.resources.id, resource.id))
    .returning({ id: schema.resources.id });
