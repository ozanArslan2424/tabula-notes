import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { sendRequest } from "@/client/utils/send-request";
import { noteSchema } from "@/lib/schemas";

const emptyEditorContent = `{ type: "doc", content: [{ type: "paragraph" }] }`;

export function useNote(id: string | undefined) {
	return useQuery<z.infer<typeof noteSchema>>({
		queryKey: ["note", { id }],
		queryFn: async () => {
			if (!id) {
				throw new Error("No note id provided");
			}

			const { data } = await sendRequest<z.infer<typeof noteSchema>>("/api/note/:id", {
				method: "GET",
				params: { id },
			});

			return { ...data, content: JSON.parse(data.content ?? emptyEditorContent) };
		},
		refetchOnWindowFocus: false,
	});
}
