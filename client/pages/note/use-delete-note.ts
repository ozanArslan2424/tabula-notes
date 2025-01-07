import { api } from "@/app/api";
import { sendRequest } from "@/app/api/methods";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteNote(id: string | undefined) {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationKey: [api.noteDelete.key, { id }],
		mutationFn: () => {
			if (!id) {
				throw new Error("Note ID is required");
			}
			return sendRequest(api.noteDelete.path, {
				method: api.noteDelete.method,
				params: { id },
			});
		},
		onSuccess: () => {
			toast.success("Note deleted successfully");
			queryClient.invalidateQueries({
				queryKey: [api.noteAll.key],
			});
		},
		onError: (error) => {
			console.error(error);
			toast.error("Failed to delete note");
		},
	});

	return { deleteNote: mutate };
}
