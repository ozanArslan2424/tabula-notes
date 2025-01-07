import { Hono } from "hono";
import { HonoType } from "@/server/types";
import { deleteNoteLogic } from "./:id.delete";
import { getNoteLogic } from "./:id.get";
import { updateNoteContentLogic } from "./:id.put";
import { getAllNotesLogic } from "./all.get";
import { createNoteLogic } from "./create.post";
import { updateNoteLogic } from "./update/:id.put";

export const noteRoutes = new Hono<HonoType>()
	.post("/create", createNoteLogic)
	.get("/all", getAllNotesLogic)
	.get("/:id", getNoteLogic)
	.put("/:id", updateNoteContentLogic)
	.put("/update/:id", updateNoteLogic)
	.delete("/:id", deleteNoteLogic);
