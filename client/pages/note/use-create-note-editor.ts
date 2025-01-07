import { useEditor } from "@tiptap/react";
import type { Editor, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import type { Dispatch, SetStateAction } from "react";

export function useCreateNoteEditor({
	content,
	setContent,
	className,
}: {
	content: Content;
	setContent: Dispatch<SetStateAction<Content>>;
	className: string;
}) {
	const editor = useEditor({
		extensions: [StarterKit, Underline],
		content,
		autofocus: false,
		editorProps: {
			attributes: {
				id: "content",
				name: "content",
				class: className,
			},
		},
		onUpdate: ({ editor }) => {
			setContent(editor.getJSON());
		},
	});

	return editor as Editor;
}
