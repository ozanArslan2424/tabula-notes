import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { Popover } from "@/client/components/popover";
import { cn } from "@/client/utils/cn";

export function NotesPaginationNavbar({
	currentPage,
	setCurrentPage,
	CONTENT_LENGTH,
	PAGE_CONTENT_LIMIT,
}: {
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	CONTENT_LENGTH: number;
	PAGE_CONTENT_LIMIT: number;
}) {
	const PAGE_BUTTON_LIMIT = 5;
	const PAGE_BUTTONS = Array.from(
		{ length: Math.ceil(CONTENT_LENGTH / PAGE_CONTENT_LIMIT) },
		(_, i) => i + 1,
	);

	const prev = () => setCurrentPage((p) => (p === 1 ? p : p - 1));
	const goto = (page: number) => setCurrentPage(page);
	const next = () =>
		setCurrentPage((p) => (p === Math.ceil(CONTENT_LENGTH / PAGE_CONTENT_LIMIT) ? p : p + 1));

	if (CONTENT_LENGTH === 0) return null;

	return (
		<nav id="pagination-navbar" className="flex items-center gap-2">
			{currentPage !== 1 && (
				<button type="button" className="circle" onClick={prev}>
					<ChevronLeftIcon />
				</button>
			)}

			{PAGE_BUTTONS.slice(0, PAGE_BUTTON_LIMIT).map((page) => (
				<button
					type="button"
					key={page}
					className={cn("circle", currentPage === page && "border-ring border-2")}
					onClick={() => goto(page)}
				>
					{page}
				</button>
			))}

			{PAGE_BUTTONS.length > PAGE_BUTTON_LIMIT && (
				<Popover
					trigger={{
						className:
							"circle data-[state=open]:border-ring data-[state=open]:border-2",
						children: <MoreHorizontalIcon />,
					}}
					content={{
						align: "end",
						side: "bottom",
						className: "grid grid-cols-4 gap-2",
						children: PAGE_BUTTONS.map((page) => (
							<button
								type="button"
								key={page}
								className={cn(
									"circle",
									currentPage === page && "border-ring border-2",
								)}
								onClick={() => goto(page)}
							>
								{page}
							</button>
						)),
					}}
				/>
			)}

			<button type="button" className="circle" onClick={next}>
				<ChevronRightIcon />
			</button>
		</nav>
	);
}
