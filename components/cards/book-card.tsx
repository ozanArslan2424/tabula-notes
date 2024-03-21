"use client";
import { deleteBook } from "@/lib/actions/delete";
import { Book } from "@prisma/client";
import Link from "next/link";
import { useMemo, useTransition } from "react";
import { DeleteBookButton } from "../buttons/delete-button";
import { LoadingIcon } from "../ui/custom-loading";

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
          <DeleteBookButton onClick={handleDelete} />

          <Link href={`/dash/${book.id}`} key={book.id}>
            <div className="min-h-[140px] w-[360px] rounded-md border bg-card/30 p-4 transition-all sm:hover:shadow dark:sm:hover:border-primary/30">
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
