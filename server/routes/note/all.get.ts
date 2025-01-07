import { eq } from "drizzle-orm";
import { db, table } from "@/server/db";
import { HonoContext } from "@/server/types";

export async function getAllNotesLogic(c: HonoContext) {
	const user = c.get("user");

	if (!user) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	const notes = await db.select().from(table.note).where(eq(table.note.userId, user.id));

	return c.json(notes);
}
