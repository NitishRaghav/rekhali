import { db } from "@/server/db";
import { adminUsers, settings } from "@/shared/schema";
import crypto from "crypto";

export async function initDatabase() {
  try {
    // Check if admin user exists
    const existingAdmin = await db.query.adminUsers.findFirst();
    
    if (!existingAdmin) {
      // Create default admin user
      const hashedPassword = crypto.createHash("sha256").update("Rekhali@2024").digest("hex");
      await db.insert(adminUsers).values({
        email: "admin@rekhali.com",
        password: hashedPassword,
      });
    }

    // Check if settings exist
    const existingSettings = await db.query.settings.findFirst();
    
    if (!existingSettings) {
      // Create default settings
      await db.insert(settings).values({
        key: "whatsapp_number",
        value: "+919876543210",
      });
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}
