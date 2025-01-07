import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { GenericError } from "@/client/components/generic-error";
import { cn } from "@/client/utils/cn";
import { NoteCreateForm } from "./note-create-form";
import { NoteLink } from "./note-link";
import { NotesPaginationNavbar } from "./note-paginaton-navbar";
import { useAllNotes } from "./use-all-notes";

export function NotePage() {
	const [organizing, setOrganizing] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isPending, error } = useAllNotes();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <GenericError error={error} />;
	}

	const CONTENT_LENGTH = data.length;
	const PAGE_CONTENT_LIMIT = 20;

	const PAGE_CONTENTS = data
		.slice((currentPage - 1) * PAGE_CONTENT_LIMIT, currentPage * PAGE_CONTENT_LIMIT)
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	return (
		<div className="px-16 py-8">
			<div className="flex gap-8">
				<div className="w-[500px] shrink-0">
					<div className="pb-5">
						<h3>New Note</h3>
					</div>
					<NoteCreateForm />
				</div>
				<div className="w-full">
					<div className="flex items-center justify-between pb-4">
						<div className="flex items-center gap-2">
							<h3>All Notes</h3>
							<button
								type="button"
								className={cn(
									"circle",
									organizing
										? "secondary"
										: "ghost text-muted-foreground hover:text-foreground",
								)}
								onClick={() => setOrganizing((prev) => !prev)}
							>
								<PencilIcon size={14} />
							</button>
						</div>
						<NotesPaginationNavbar
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							CONTENT_LENGTH={CONTENT_LENGTH}
							PAGE_CONTENT_LIMIT={PAGE_CONTENT_LIMIT}
						/>
					</div>
					<ul className="grid grid-cols-3 gap-4">
						{CONTENT_LENGTH === 0 ? (
							<li>
								<em className="text-muted-foreground">No notes found</em>
							</li>
						) : (
							PAGE_CONTENTS.map((note) => (
								<li key={note.id}>
									<NoteLink note={note} organizing={organizing} />
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
