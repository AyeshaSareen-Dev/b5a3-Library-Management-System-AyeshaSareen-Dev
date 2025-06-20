import app from "../src/app";
import { environment } from "../src/config/Environment";
import mongoose from "mongoose";

async function main() {
  console.info("[Main] Connecting to database...");
  const db = await mongoose.connect(environment.databaseUrl);

  app.listen(environment.port, () => {
    console.info(
      `[Main] Server running on http://localhost:${environment.port}`
    );
  });
}
main().catch((err) => {
  console.error("[Main] Failed to start server", err);
  process.exit(1);
});
