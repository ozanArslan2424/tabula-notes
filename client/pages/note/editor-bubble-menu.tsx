import { BubbleMenu, Editor } from "@tiptap/react";
import { cn } from "@/client/utils/cn";

export function EditorBubbleMenu({ editor }: { editor: Editor | null }) {
	if (!editor) return null;

	return (
		<BubbleMenu editor={editor} tippyOptions={{ placement: "bottom" }}>
			<div className="bg-background border-primary/20 flex items-center gap-1.5 rounded-lg border p-2 *:font-serif">
				<button
					type="button"
					className={cn("icon-sm", editor.isActive("bold") ? "success" : "primary")}
					onClick={() => editor.chain().focus().toggleBold().run()}
				>
					B
				</button>
				<button
					type="button"
					className={cn("icon-sm", editor.isActive("italic") ? "success" : "primary")}
					onClick={() => editor.chain().focus().toggleItalic().run()}
				>
					I
				</button>
				<button
					type="button"
					className={cn("icon-sm", editor.isActive("strike") ? "success" : "primary")}
					onClick={() => editor.chain().focus().toggleStrike().run()}
				>
					S
				</button>
				<button
					type="button"
					className={cn("icon-sm", editor.isActive("underline") ? "success" : "primary")}
					onClick={() => editor.chain().focus().toggleUnderline().run()}
				>
					U
				</button>
			</div>
		</BubbleMenu>
	);
}
