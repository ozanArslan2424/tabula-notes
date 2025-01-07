import { useQueryClient } from "@tanstack/react-query";
import { type Content, EditorContent } from "@tiptap/react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useRequest } from "@/client/hooks/use-request";
import { insertNoteSchema } from "@/lib/schemas";
import { EditorBubbleMenu } from "./editor-bubble-menu";
import { useCreateNoteEditor } from "./use-create-note-editor";

export type NewNoteValues = z.infer<typeof insertNoteSchema>;

const emptyEditorContent: Content = { type: "doc", content: [{ type: "paragraph" }] };

export function NoteCreateForm() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState<Content>(emptyEditorContent);

	const editor = useCreateNoteEditor({
		content,
		setContent,
		className:
			"cursor-text ring-ring h-full min-h-40 w-full rounded-none px-4 py-3 focus-visible:ring-1 focus-visible:ring-offset-0 prose prose-invert prose-sm prose-headings:m-0 prose-headings:mb-2 prose-p:m-0",
	});

	const queryClient = useQueryClient();

	const { isPending, mutate } = useRequest<NewNoteValues, void>({
		path: "/api/note/create",
		options: { method: "POST" },
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["all-notes"],
			});
			toast.success("Note saved");
			handleReset();
		},
		onError: ({ message }) => toast.error(message),
	});

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (title.trim() === "") {
			toast.error("Title cannot be empty");
			return;
		}

		mutate({ title, content: JSON.stringify(content) });
	}

	function handleReset() {
		setTitle("");
		setContent(emptyEditorContent);
		editor?.commands.clearContent();
	}

	return (
		<form className="space-y-0" onSubmit={handleSubmit} onReset={handleReset}>
			<div className="input flex flex-col rounded-b-none p-0">
				<input
					id="title"
					name="title"
					type="text"
					className="default ring-ring border-primary/20 rounded-t-lg border-b px-4 py-3 font-bold focus-visible:ring-1 focus-visible:ring-offset-0"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<EditorContent editor={editor} />
				<EditorBubbleMenu editor={editor} />
			</div>

			<div className="grid grid-cols-[30%_70%]">
				<button
					type="reset"
					className="lg text-muted-foreground hover:text-error/70 rounded-t-none rounded-r-none border-t-0 border-r-0 ring-offset-0"
					disabled={isPending}
				>
					Discard
				</button>
				<button
					type="submit"
					className="lg text-muted-foreground hover:text-foreground rounded-l-none rounded-t-none border-t-0 ring-offset-0"
					disabled={isPending}
				>
					{isPending ? "Loading..." : "Save Note"}
				</button>
			</div>
		</form>
	);
}
