import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

export function useNoteEditor({
	className,
	onUpdate,
}: {
	className: string;
	onUpdate: (content: string) => void;
}) {
	const editor = useEditor({
		extensions: [StarterKit, Underline],
		autofocus: true,
		editorProps: {
			attributes: {
				id: "content",
				name: "content",
				class: className,
			},
		},
		onUpdate: ({ editor }) => {
			const contentJson = editor.getJSON();
			const content = JSON.stringify(contentJson);
			onUpdate(content);
		},
	});

	return editor as Editor;
}
