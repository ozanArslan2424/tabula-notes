import { serveStatic } from "hono/bun";
import { log } from "@/lib/log";
import { createApp } from "@/server/create-app";
import { authRoutes } from "@/server/routes/auth";
import { noteRoutes } from "@/server/routes/note";
import "@/watcher/watch-routes";

//*------------------------------------------ App setup
const app = createApp();
log.clear();
log.start("🚀 Let's go!");

//*------------------------------------------ API Routes
app.basePath("/api").route("/auth", authRoutes).route("/note", noteRoutes);

//*------------------------------------------ Static Routes
app.get("*", serveStatic({ root: "./dist" }));
app.get("*", serveStatic({ path: "./dist/index.html" }));

//*------------------------------------------ Start the server
export default {
	port: 3000,
	fetch: app.fetch,
};
