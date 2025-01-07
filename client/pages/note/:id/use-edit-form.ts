import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "@/client/hooks/use-form";
import { useRequest } from "@/client/hooks/use-request";
import { updateNoteSchema } from "@/lib/schemas";

export function useEditNoteForm(id: string) {
	const [open, setOpen] = useState(false);

	const queryClient = useQueryClient();

	const { isPending, mutate } = useRequest({
		path: "/api/note/update/:id",
		options: { method: "PUT", params: { id } },
		onSuccess: () => {
			toast.success("Note updated");
			queryClient.invalidateQueries({
				queryKey: ["note", { id }],
			});
			setOpen(false);
		},
		onError: () => toast.error("Failed to update note"),
	});

	const { errors, safeSubmit } = useForm({
		schema: updateNoteSchema,
		next: mutate,
	});

	return {
		dialogOpen: open,
		setDialogOpen: setOpen,
		errors,
		detailsUpdatePending: isPending,
		safeSubmit,
	};
}
