import { Editor } from "@tiptap/react";

export function EditorButtons({ editor }: { editor: Editor }) {
	return (
		<>
			<button
				type="button"
				className={editor.isActive("bold") ? "border-success" : ""}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				Bold
			</button>
			<button
				type="button"
				className={editor.isActive("italic") ? "border-success" : ""}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				Italic
			</button>
			<button
				type="button"
				className={editor.isActive("strike") ? "border-success" : ""}
				onClick={() => editor.chain().focus().toggleStrike().run()}
			>
				Strikethrough
			</button>
			<button
				type="button"
				className={editor.isActive("underline") ? "border-success" : ""}
				onClick={() => editor.chain().focus().toggleUnderline().run()}
			>
				Underline
			</button>
		</>
	);
}
