import { pgTable, text, serial, time, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const preferences = pgTable("preferences", {
  id: serial("id").primaryKey(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isEnabled: boolean("is_enabled").notNull().default(true),
  reminderInterval: text("reminder_interval").notNull().default("20"),
});

export const insertPreferencesSchema = createInsertSchema(preferences).pick({
  startTime: true,
  endTime: true,
  isEnabled: true,
  reminderInterval: true,
});

export type InsertPreferences = z.infer<typeof insertPreferencesSchema>;
export type Preferences = typeof preferences.$inferSelect;
