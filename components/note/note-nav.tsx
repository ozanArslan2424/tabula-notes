import { BookType } from "@/lib/types";
import { toSnakeCase } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function NoteNavigation({ currentBook }: { currentBook: BookType }) {
  const notes = useMemo(
    () =>
      currentBook.notes?.map((note) => {
        return {
          ...note,
        };
      }),
    [currentBook.notes],
  );
  return (
    <div className="flex flex-col gap-1 border-b border-primary/10 px-2 py-4">
      {notes?.map((note) => (
        <Link href={`#${toSnakeCase(note.title)}`} key={note.id}>
          <div className="group relative flex h-9 w-full items-center justify-start gap-4 truncate rounded-sm px-2 py-1 text-sm capitalize hover:bg-accent">
            <ChevronRight className="transition-transform group-hover:translate-x-2" size={14} />
            {note.title}
          </div>
        </Link>
      ))}
    </div>
  );
}
