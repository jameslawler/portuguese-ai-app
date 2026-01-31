import { DrizzleClient } from "..";
import { eq, desc } from "drizzle-orm";

import * as schema from "../schema";
import { Message } from "../../../types/message";

export const getMessages = async (db: DrizzleClient) =>
  db.select().from(schema.messages).all();

export const getUserMessages = async (db: DrizzleClient, userId: string) =>
  db
    .select()
    .from(schema.messages)
    .where(eq(schema.messages.userId, userId))
    .orderBy(desc(schema.messages.createdAt))
    .limit(6)
    .all();

export const getMessage = async (db: DrizzleClient, id: string) =>
  db.select().from(schema.messages).where(eq(schema.messages.id, id)).get();

export const createMessage = async (
  db: DrizzleClient,
  message: Omit<Message, "id">
) =>
  db
    .insert(schema.messages)
    .values({
      id: crypto.randomUUID(),
      userId: message.userId,
      role: message.role,
      content: message.content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning({
      id: schema.messages.id,
      userId: schema.messages.userId,
      role: schema.messages.role,
      content: schema.messages.content,
      createdAt: schema.messages.createdAt,
      updatedAt: schema.messages.updatedAt,
    });

export const updateMessage = async (db: DrizzleClient, message: Message) =>
  db
    .update(schema.messages)
    .set({
      userId: message.userId,
      role: message.role,
      content: message.content,
      updatedAt: Date.now(),
    })
    .where(eq(schema.messages.id, message.id))
    .returning({
      id: schema.messages.id,
      userId: schema.messages.userId,
      role: schema.messages.role,
      content: schema.messages.content,
      createdAt: schema.messages.createdAt,
      updatedAt: schema.messages.updatedAt,
    });
