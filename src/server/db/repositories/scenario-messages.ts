import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";
import { ScenarioMessage } from "../../../types/scenario-message";

export const getScenarioMessages = async (db: DrizzleClient) =>
  db.select().from(schema.scenarioMessages).all();

export const getScenarioMessage = async (db: DrizzleClient, id: string) =>
  db
    .select()
    .from(schema.scenarioMessages)
    .where(eq(schema.scenarioMessages.id, id))
    .get();

export const createScenarioMessage = async (
  db: DrizzleClient,
  message: Omit<ScenarioMessage, "id">
) =>
  db
    .insert(schema.scenarioMessages)
    .values({
      id: crypto.randomUUID(),
      userId: message.userId,
      sessionId: message.sessionId,
      role: message.role,
      content: message.content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning({
      id: schema.scenarioMessages.id,
      userId: schema.scenarioMessages.userId,
      sessionId: schema.scenarioMessages.sessionId,
      role: schema.scenarioMessages.role,
      content: schema.scenarioMessages.content,
      createdAt: schema.scenarioMessages.createdAt,
      updatedAt: schema.scenarioMessages.updatedAt,
    });

export const updateScenarioMessage = async (
  db: DrizzleClient,
  message: ScenarioMessage
) =>
  db
    .update(schema.scenarioMessages)
    .set({
      userId: message.userId,
      sessionId: message.sessionId,
      role: message.role,
      content: message.content,
      updatedAt: Date.now(),
    })
    .where(eq(schema.scenarioMessages.id, message.id))
    .returning({
      id: schema.scenarioMessages.id,
      userId: schema.scenarioMessages.userId,
      sessionId: schema.scenarioMessages.sessionId,
      role: schema.scenarioMessages.role,
      content: schema.scenarioMessages.content,
      createdAt: schema.scenarioMessages.createdAt,
      updatedAt: schema.scenarioMessages.updatedAt,
    });
