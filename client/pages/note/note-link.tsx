import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { AlertDialog } from "@/client/components/dialog";
import { Link } from "@/client/components/link";
import { useRequest } from "@/client/hooks/use-request";
import { allNotesSchema } from "@/lib/schemas";
import { EditorViewOnly } from "./editor-view-only";

export function NoteLink({
	note,
	organizing,
}: {
	note: z.infer<typeof allNotesSchema>[number];
	organizing?: boolean;
}) {
	const queryClient = useQueryClient();

	const { mutate } = useRequest<void, void>({
		path: "/api/note/:id",
		options: { method: "DELETE", params: { id: note.id } },
		onError: ({ message }) => toast.error(message),
		onSuccess: () => {
			toast.success("Note deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["all-notes"] });
		},
	});

	return (
		<div className="relative">
			<AnimatePresence>
				{organizing && (
					<motion.div
						className="absolute top-0 right-0"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<AlertDialog
							trigger={{
								className:
									"icon-sm error size-7 rounded-tl-none rounded-tr-lg rounded-br-none rounded-bl-lg",
								children: <XIcon strokeWidth={3} />,
							}}
							title="Delete note"
							description="Are you sure you want to delete this note?"
							action={{
								className: "button error",
								children: "Delete",
								onClick: () => mutate(),
							}}
							cancel={{}}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<Link
				className="button h-full max-h-80 min-h-28 w-full flex-col items-start justify-start py-4 font-normal"
				to="/note/:id"
				params={{ id: note.id }}
			>
				<h4 className="pb-2 font-bold">{note.title}</h4>
				<EditorViewOnly
					content={note.content}
					className="text-muted-foreground prose prose-invert prose-sm prose-headings:m-0 prose-headings:mb-2 prose-p:m-0 line-clamp-3 overflow-clip"
				/>
			</Link>
		</div>
	);
}
