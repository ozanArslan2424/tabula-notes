import { and, eq } from "drizzle-orm";
import { db, table } from "@/server/db";
import { HonoContext } from "@/server/types";

export async function deleteNoteLogic(c: HonoContext) {
	const user = c.get("user");
	const noteId = c.req.param().id;

	if (!user) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	await db
		.delete(table.note)
		.where(and(eq(table.note.id, noteId), eq(table.note.userId, user.id)));

	return c.json({ message: "Note deleted" }, 200);
}
