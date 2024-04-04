"use client";
import { deleteBook } from "@/lib/actions/delete";
import { Book } from "@prisma/client";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useTransition } from "react";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { BookSettings } from "./book-settings-form";
import { DeleteBookButton } from "./delete-button";

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  const createdAtString = useMemo(() => book.createdAt.toLocaleDateString(), [book.createdAt]);
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
        <div className="relative min-h-[140px] w-max">
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2 ">
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
            <div className="min-h-[140px] w-[360px] rounded-md border bg-card/30 p-4 transition-all hover:border-primary/60 hover:shadow active:border-primary/60 active:shadow">
              <p className="mb-2 text-xs text-muted-foreground">{createdAtString}</p>
              <h2 className="line-clamp-2 hyphens-auto text-wrap break-words text-xl font-semibold capitalize">
                {book.title}
              </h2>
              <p className="text-muted-foreground">{book.description}</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
