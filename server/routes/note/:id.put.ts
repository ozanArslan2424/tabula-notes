import { and, eq } from "drizzle-orm";
import { updateContentSchema } from "@/lib/schemas";
import { db, table } from "@/server/db";
import { HonoContext } from "@/server/types";

export async function updateNoteContentLogic(c: HonoContext) {
	const user = c.get("user");
	const noteId = c.req.param().id;
	// TODO: find a way to use query params

	if (!user) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	const body = await c.req.json();
	const { data, error } = updateContentSchema.safeParse(body);

	if (error) {
		return c.json({ message: "Invalid data", error }, 400);
	}

	await db
		.update(table.note)
		.set({
			content: data.content,
			updatedAt: new Date(),
		})
		.where(and(eq(table.note.id, noteId), eq(table.note.userId, user.id)));

	return c.json({ message: "Note updated" }, 200);
}
