import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertPreferencesSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  app.get("/api/preferences/:id", async (req, res) => {
    const prefs = await storage.getPreferences(parseInt(req.params.id));
    if (!prefs) {
      res.status(404).json({ message: "Preferences not found" });
      return;
    }
    res.json(prefs);
  });

  app.post("/api/preferences", async (req, res) => {
    const parsed = insertPreferencesSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid preferences data" });
      return;
    }
    const prefs = await storage.createPreferences(parsed.data);
    res.json(prefs);
  });

  app.patch("/api/preferences/:id", async (req, res) => {
    const parsed = insertPreferencesSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid preferences data" });
      return;
    }
    const prefs = await storage.updatePreferences(parseInt(req.params.id), parsed.data);
    res.json(prefs);
  });

  return createServer(app);
}
