import { eq } from "drizzle-orm";
import { db, table } from "@/server/db";
import { HonoContext } from "@/server/types";

export async function getNoteLogic(c: HonoContext) {
	const user = c.get("user");
	const noteId = c.req.param().id;

	if (!user) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	const note = await db.select().from(table.note).where(eq(table.note.id, noteId));
	const selectedNote = note[0];

	return c.json(selectedNote);
}
