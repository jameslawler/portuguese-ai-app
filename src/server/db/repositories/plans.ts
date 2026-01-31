import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";
import { Plan } from "../../../types/plan";

export const getPlans = async (db: DrizzleClient) =>
  db.select().from(schema.plans).all();

export const getPlan = async (db: DrizzleClient, id: string) =>
  db.select().from(schema.plans).where(eq(schema.plans.id, id)).get();

export const getHomePlan = async (db: DrizzleClient) =>
  db.select().from(schema.plans).where(eq(schema.plans.isHomePlan, true)).get();

export const createPlan = async (db: DrizzleClient, plan: Omit<Plan, "id">) =>
  db
    .insert(schema.plans)
    .values({
      id: crypto.randomUUID(),
      name: plan.name,
      nodes: plan.nodes,
      isHomePlan: plan.isHomePlan,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning({ id: schema.plans.id });

export const updatePlan = async (db: DrizzleClient, plan: Plan) =>
  db
    .update(schema.plans)
    .set({
      name: plan.name,
      nodes: plan.nodes,
      isHomePlan: plan.isHomePlan,
      updatedAt: Date.now(),
    })
    .where(eq(schema.plans.id, plan.id))
    .returning({ id: schema.plans.id });
