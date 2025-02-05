import { preferences, type Preferences, type InsertPreferences } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPreferences(id: number): Promise<Preferences | undefined>;
  updatePreferences(id: number, prefs: InsertPreferences): Promise<Preferences>;
  createPreferences(prefs: InsertPreferences): Promise<Preferences>;
}

export class DatabaseStorage implements IStorage {
  async getPreferences(id: number): Promise<Preferences | undefined> {
    const [prefs] = await db.select().from(preferences).where(eq(preferences.id, id));
    return prefs || undefined;
  }

  async updatePreferences(id: number, prefs: InsertPreferences): Promise<Preferences> {
    const [updated] = await db
      .update(preferences)
      .set(prefs)
      .where(eq(preferences.id, id))
      .returning();
    return updated;
  }

  async createPreferences(prefs: InsertPreferences): Promise<Preferences> {
    const [created] = await db
      .insert(preferences)
      .values(prefs)
      .returning();
    return created;
  }
}

export const storage = new DatabaseStorage();