import { EditorContent, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

export function EditorViewOnly({ content, className }: { content: string; className?: string }) {
	return (
		<EditorProvider
			content={JSON.parse(content)}
			autofocus={false}
			extensions={[StarterKit, Underline]}
			editable={false}
			editorProps={{
				attributes: {
					class: className || "",
				},
			}}
		>
			<EditorContent editor={null} />
		</EditorProvider>
	);
}
