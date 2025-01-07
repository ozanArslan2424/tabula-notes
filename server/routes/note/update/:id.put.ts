import { and, eq } from "drizzle-orm";
import { updateNoteSchema } from "@/lib/schemas";
import { db, table } from "@/server/db";
import { HonoContext } from "@/server/types";

export async function updateNoteLogic(c: HonoContext) {
	const user = c.get("user");
	const noteId = c.req.param().id;

	if (!user) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	const body = await c.req.json();
	const { data, error } = updateNoteSchema.safeParse(body);

	if (error) {
		return c.json({ message: "Invalid data", error }, 400);
	}

	await db
		.update(table.note)
		.set({
			title: data.title,
			description: data.description,
			updatedAt: new Date(),
		})
		.where(and(eq(table.note.id, noteId), eq(table.note.userId, user.id)));

	return c.json({ message: "Note updated" }, 200);
}
