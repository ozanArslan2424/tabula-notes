"use client";
import { deleteBook } from "@/lib/actions/delete";
import { BookType } from "@/lib/types";
import { CheckSquareIcon, ComponentIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useTransition } from "react";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { BookSettings } from "./book-settings-form";
import { DeleteBookButton } from "./delete-button";

export const BookCard = ({ book }: { book: BookType }) => {
  const createdAtString = useMemo(
    () =>
      book.createdAt.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [book.createdAt],
  );
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deleteBook(book.id!);
    });
  };

  return (
    <>
      {isPending ? (
        <div className="relative flex min-h-[140px] w-[360px] items-center justify-center border shadow">
          <LoadingIcon />
        </div>
      ) : (
        <div className="relative h-full min-h-[140px] w-full text-left md:max-w-[360px]">
          <div className="absolute right-4 top-4 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button onClick={(e) => e.preventDefault()} size="icon" variant="ghost">
                  <MoreVerticalIcon size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <BookSettings mode="compact" book={book} />
                <DeleteBookButton onClick={handleDelete} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link href={`/dash/${book.id}`} key={book.id}>
            <div className="h-full min-h-[140px] w-full rounded-md border bg-card/30 p-4 transition-all hover:border-primary/60 hover:shadow active:border-primary/60 active:shadow">
              <p className="mb-2 text-xs text-muted-foreground">{createdAtString}</p>
              <h2 className="line-clamp-2 hyphens-auto text-wrap break-words text-xl font-semibold capitalize">
                {book.title}
              </h2>
              <p className="text-muted-foreground">{book.description}</p>
              <div className="flex items-center gap-2">
                <div
                  className={`mt-2 flex w-max items-center justify-center gap-2 rounded-sm ${book.hasTasks ? "bg-emerald-300" : "bg-muted"} px-2 py-1 text-black`}
                >
                  <CheckSquareIcon size={12} />
                  <p className="text-xs">{book.tasks?.length}</p>
                </div>
                <div className="mt-2 flex w-max items-center justify-center gap-2 rounded-sm bg-primary px-2 py-1 text-primary-foreground">
                  <ComponentIcon size={12} />
                  <p className="text-xs">{book.groups?.length}</p>
                </div>
                {/* <div className="mt-2 flex w-max items-center justify-center gap-2 rounded-sm bg-primary px-2 py-1 text-primary-foreground">
                  <ScrollIcon size={12} />
                  <p className="text-xs">{book.groups?.length}</p>
                </div> */}
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
