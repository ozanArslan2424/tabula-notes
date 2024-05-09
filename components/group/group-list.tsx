import { BookType } from "@/lib/types";
import { toSnakeCase } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export const GroupList = ({ currentBook }: { currentBook: BookType }) => {
  const groups = useMemo(
    () =>
      currentBook.groups?.map((group) => {
        return {
          ...group,
        };
      }),
    [currentBook.groups],
  );
  return (
    <div className="vertical gap-1">
      {groups?.map((group) => (
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
