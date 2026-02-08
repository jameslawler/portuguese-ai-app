import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";
import { ScenarioSession } from "../../../types/scenario-session";

export const getScenarioSessions = async (db: DrizzleClient) =>
  db.select().from(schema.scenarioSessions).all();

export const getScenarioSession = async (db: DrizzleClient, id: string) =>
  db
    .select()
    .from(schema.scenarioSessions)
    .where(eq(schema.scenarioSessions.id, id))
    .get();

export const createScenarioSession = async (
  db: DrizzleClient,
  session: Omit<ScenarioSession, "id">
) =>
  db
    .insert(schema.scenarioSessions)
    .values({
      id: crypto.randomUUID(),
      userId: session.userId,
      type: session.type,
      configuration: session.configuration,
      objectives: session.objectives,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning({
      id: schema.scenarioSessions.id,
      userId: schema.scenarioSessions.userId,
      type: schema.scenarioSessions.type,
      configuration: schema.scenarioSessions.configuration,
      objectives: schema.scenarioSessions.objectives,
      createdAt: schema.scenarioSessions.createdAt,
      updatedAt: schema.scenarioSessions.updatedAt,
    });

export const updateScenarioSession = async (
  db: DrizzleClient,
  session: ScenarioSession
) =>
  db
    .update(schema.scenarioSessions)
    .set({
      userId: session.userId,
      type: session.type,
      configuration: session.configuration,
      objectives: session.objectives,
      updatedAt: Date.now(),
    })
    .where(eq(schema.scenarioSessions.id, session.id))
    .returning({
      id: schema.scenarioSessions.id,
      userId: schema.scenarioSessions.userId,
      type: schema.scenarioSessions.type,
      configuration: schema.scenarioSessions.configuration,
      objectives: schema.scenarioSessions.objectives,
      createdAt: schema.scenarioSessions.createdAt,
      updatedAt: schema.scenarioSessions.updatedAt,
    });
