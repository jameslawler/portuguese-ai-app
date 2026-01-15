import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";

export const getPlans = async (db: DrizzleClient) =>
  db
    .select()
    .from(schema.plans)
    .all();

export const getPlan = async (db: DrizzleClient, id: string) =>
  db
    .select()
    .from(schema.plans)
    .where(eq(schema.plans.id, id))
    .get();

export const getHomePlan = async (db: DrizzleClient) =>
  db
    .select()
    .from(schema.plans)
    .where(eq(schema.plans.isHomePlan, true))
    .get();
