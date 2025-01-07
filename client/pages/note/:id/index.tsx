import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { GenericError } from "@/client/components/generic-error";
import { EditorTitle } from "./editor-title";
import { useNote } from "./use-note";
import { useNoteEditor } from "./use-note-editor";
import { useUpdateNoteContent } from "./use-update-content";

export function NoteIdPage() {
	const { id } = useParams<{ id: string }>();
	const { data, error: fetchError, isPending } = useNote(id);
	const { updateNoteContent } = useUpdateNoteContent(id!);

	const editor = useNoteEditor({
		className:
			"cursor-text h-full min-h-80 w-full min-w-full border border-primary/20 focus-visible:border-transparent rounded-xl p-6 prose prose-invert prose-sm prose-headings:m-0 prose-headings:mb-2 prose-p:m-0",
		onUpdate: updateNoteContent,
	});

	useEffect(() => {
		if (data) {
			editor.commands.setContent(data.content);
		}
	}, [data]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (fetchError) {
		return <GenericError error={fetchError} />;
	}

	if (!id) {
		const invalidIdError = new Error("Invalid note ID");
		return <GenericError error={invalidIdError} />;
	}

	return (
		<div className="mx-auto max-w-max pt-16">
			<div className="flex min-w-xl flex-col gap-4">
				<div className="flex w-full justify-between">
					<EditorTitle id={id} data={data} />
				</div>

				<EditorContent editor={editor} />
			</div>
		</div>
	);
}
