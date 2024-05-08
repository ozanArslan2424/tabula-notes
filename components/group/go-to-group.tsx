import { BookType } from "@/lib/types";
import { toSnakeCase } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const GoToGroup = ({ currentBook }: { currentBook: BookType }) => {
  return (
    <div className="card vertical gap-1">
      {/* <h2 className="text-md px-2 font-semibold">Gruba git</h2> */}

      {currentBook.groups?.map((group) => (
        <Link href={`#${toSnakeCase(group.title)}`} key={group.id}>
          <div className="group relative flex h-9 w-full items-center justify-start gap-2 truncate rounded-sm px-2 py-1 text-sm capitalize hover:bg-accent">
            <ChevronRight className="transition-transform group-hover:translate-x-1" size={14} />
            {group.title}
          </div>
        </Link>
      ))}
    </div>
  );
};
