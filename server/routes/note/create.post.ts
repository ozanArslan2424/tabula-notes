import { insertNoteSchema } from "@/lib/schemas";
import { db, table } from "@/server/db";
import { HonoContext } from "@/server/types";

export async function createNoteLogic(c: HonoContext) {
	const user = c.get("user");

	if (!user) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	const body = await c.req.json();
	const { data, error } = insertNoteSchema.safeParse(body);

	if (error) {
		return c.json({ message: "Invalid data", error }, 400);
	}

	await db.insert(table.note).values({
		id: crypto.randomUUID(),
		userId: user.id,
		title: data.title,
		content: data.content,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	return c.json({ message: "Note created" }, 201);
}
