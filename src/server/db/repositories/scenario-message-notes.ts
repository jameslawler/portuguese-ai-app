import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";
import { ScenarioMessageNote } from "../../../types/scenario-message-note";

export const getScenarioMessageNotes = async (db: DrizzleClient) =>
  db.select().from(schema.scenarioMessageNotes).all();

export const getScenarioMessageNote = async (db: DrizzleClient, id: string) =>
  db
    .select()
    .from(schema.scenarioMessageNotes)
    .where(eq(schema.scenarioMessageNotes.id, id))
    .get();

export const createScenarioMessageNote = async (
  db: DrizzleClient,
  message: Omit<ScenarioMessageNote, "id">
) =>
  db
    .insert(schema.scenarioMessageNotes)
    .values({
      id: crypto.randomUUID(),
      userId: message.userId,
      messageId: message.messageId,
      type: message.type,
      content: message.content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning({
      id: schema.scenarioMessageNotes.id,
      userId: schema.scenarioMessageNotes.userId,
      messageId: schema.scenarioMessageNotes.messageId,
      type: schema.scenarioMessageNotes.type,
      content: schema.scenarioMessageNotes.content,
      createdAt: schema.scenarioMessageNotes.createdAt,
      updatedAt: schema.scenarioMessageNotes.updatedAt,
    });

export const updateScenarioMessageNote = async (
  db: DrizzleClient,
  note: ScenarioMessageNote
) =>
  db
    .update(schema.scenarioMessageNotes)
    .set({
      userId: note.userId,
      messageId: note.messageId,
      type: note.type,
      content: note.content,
      updatedAt: Date.now(),
    })
    .where(eq(schema.scenarioMessageNotes.id, note.id))
    .returning({
      id: schema.scenarioMessageNotes.id,
      userId: schema.scenarioMessageNotes.userId,
      messageId: schema.scenarioMessageNotes.messageId,
      type: schema.scenarioMessageNotes.type,
      content: schema.scenarioMessageNotes.content,
      createdAt: schema.scenarioMessageNotes.createdAt,
      updatedAt: schema.scenarioMessageNotes.updatedAt,
    });
