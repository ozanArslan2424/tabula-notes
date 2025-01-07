import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { sendRequest } from "@/client/utils/send-request";
import { allNotesSchema } from "@/lib/schemas";

export function useAllNotes() {
	return useQuery<z.infer<typeof allNotesSchema>>({
		queryKey: ["all-notes"],
		queryFn: async () => {
			const { data, res } = await sendRequest("/api/note/all", { method: "GET" });

			if (!res.ok) {
				throw new Error(data);
			}

			return data;
		},
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	});
}
