import throttle from "lodash.throttle";
import { useRef } from "react";
import { toast } from "sonner";
import { useRequest } from "@/client/hooks/use-request";

export function useUpdateNoteContent(id: string) {
	const { mutate } = useRequest({
		path: "/api/note/:id",
		options: { method: "PUT", params: { id } },
		onSuccess: () => toast.success("Note updated"),
		onError: () => toast.error("Failed to update note"),
	});

	const updateContentThrottled = useRef(throttle(mutate, 8000));

	return { updateNoteContent: (content: string) => updateContentThrottled.current({ content }) };
}
