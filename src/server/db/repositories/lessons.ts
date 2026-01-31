import { DrizzleClient } from "..";
import { eq } from "drizzle-orm";

import * as schema from "../schema";
import { Lesson } from "../../../types/lesson";

export const getLessons = async (db: DrizzleClient) =>
  db.select().from(schema.lessons).all();

export const getLesson = async (db: DrizzleClient, id: string) =>
  db.select().from(schema.lessons).where(eq(schema.lessons.id, id)).get();

export const createLesson = async (
  db: DrizzleClient,
  lesson: Omit<Lesson, "id">
) =>
  db
    .insert(schema.lessons)
    .values({
      id: crypto.randomUUID(),
      title: lesson.title,
      markdown: lesson.markdown,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    .returning({ id: schema.lessons.id });

export const updateLesson = async (db: DrizzleClient, lesson: Lesson) =>
  db
    .update(schema.lessons)
    .set({
      title: lesson.title,
      markdown: lesson.markdown,
      updatedAt: Date.now(),
    })
    .where(eq(schema.lessons.id, lesson.id))
    .returning({ id: schema.lessons.id });
