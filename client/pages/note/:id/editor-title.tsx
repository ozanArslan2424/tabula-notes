import { z } from "zod";
import { Dialog } from "@/client/components/dialog";
import { Tooltip } from "@/client/components/tooltip";
import { noteSchema } from "@/lib/schemas";
import { useEditNoteForm } from "./use-edit-form";

export function EditorTitle({ id, data }: { id: string; data: z.infer<typeof noteSchema> }) {
	const { dialogOpen, setDialogOpen, errors, safeSubmit, detailsUpdatePending } =
		useEditNoteForm(id);

	return (
		<Tooltip tip="Click to edit note details" tipProps={{ side: "top", align: "start" }}>
			<Dialog
				variant="dialog"
				trigger={<h1>{data.title}</h1>}
				title="Edit note"
				description=""
				open={dialogOpen}
				onOpenChange={(o) => setDialogOpen(o)}
			>
				<form onSubmit={safeSubmit}>
					<fieldset>
						<label htmlFor="title">Title</label>
						<input type="text" name="title" id="title" defaultValue={data.title} />
						{errors.title && <label htmlFor="title">{errors.title}</label>}
					</fieldset>
					<fieldset>
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							id="description"
							defaultValue={data.description || ""}
						/>
						{errors.description && (
							<label htmlFor="description">{errors.description}</label>
						)}
					</fieldset>
					<button type="submit" className="primary">
						{detailsUpdatePending ? "Saving..." : "Save"}
					</button>
				</form>
			</Dialog>
		</Tooltip>
	);
}
