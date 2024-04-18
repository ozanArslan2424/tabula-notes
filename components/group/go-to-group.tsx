import { BookType } from "@/lib/types";
import { toSnakeCase } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const GoToGroup = ({ currentBook }: { currentBook: BookType }) => {
  return (
    <div className="mb-4 min-w-48 space-y-2 rounded-lg border bg-card px-2 py-2 text-card-foreground shadow">
      <h2 className="text-md px-2 font-semibold">Gruba git</h2>
      <div className="flex max-h-[480px] flex-col gap-1 overflow-y-scroll">
        {currentBook.groups?.map((group) => (
          <Link href={`#${toSnakeCase(group.title)}`} key={group.id}>
            <div className="group relative flex h-9 w-full items-center justify-start gap-2 truncate rounded-sm px-2 py-1 text-sm shadow-sm hover:bg-accent">
              <ChevronRight className="transition-transform group-hover:translate-x-1" size={14} />
              {group.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
