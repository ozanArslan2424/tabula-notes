"use client";
import { deleteBook } from "@/lib/actions/delete";
import { BookInfoType } from "@/lib/types";
import { CheckSquareIcon, ComponentIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useTransition } from "react";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { BookSettings } from "./book-settings-form";
import { DeleteBookButton } from "./delete-button";

export type BookInfoProps = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  hasTasks: boolean;
  _count: {
    groups: number;
    tasks: number;
  };
};

export const BookItem = ({ book }: { book: BookInfoType }) => {
  const [isPending, startTransition] = useTransition();

  const bookInfo = useMemo(
    () => ({
      ...book,
    }),
    [book],
  );
  const createdAtString = useMemo(
    () =>
      book.createdAt.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [book.createdAt],
  );

  const handleDelete = () => {
    startTransition(() => {
      deleteBook(bookInfo.id!);
    });
  };

  if (isPending)
    return (
      <div className="grid min-h-36 w-full items-center justify-center rounded-md border shadow md:w-[360px]">
        <LoadingIcon />
      </div>
    );

  return (
    <div className="relative h-full min-h-36 w-full text-left md:max-w-[360px]">
      <div className="absolute right-2 top-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button onClick={(e) => e.preventDefault()} size="sm_icon" variant="ghost">
              <MoreVerticalIcon size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <BookSettings mode="compact" book={book} />
            <DeleteBookButton onClick={handleDelete} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Link
        href={`/dash/${bookInfo.id}`}
        key={bookInfo.id}
        className="flex h-full min-h-[180px] flex-col justify-between rounded-md border p-4 transition-all hover:border-primary/60 hover:shadow active:border-primary/60 active:shadow"
      >
        <div>
          <p className="mb-2 text-xs text-muted-foreground">{createdAtString}</p>
          <h2 className="line-clamp-2 hyphens-auto text-wrap break-words text-xl font-semibold capitalize">
            {bookInfo.title}
          </h2>
          <p className="line-clamp-2 hyphens-auto text-wrap break-words text-muted-foreground ">
            {bookInfo.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="mt-2 flex w-max items-center justify-center gap-2 rounded-sm bg-primary px-2 py-1 text-primary-foreground">
            <ComponentIcon size={12} />
            <p className="text-xs">{bookInfo._count.groups}</p>
          </div>
          {bookInfo.hasTasks && (
            <div className="mt-2 flex w-max items-center justify-center gap-2 rounded-sm bg-emerald-300 px-2 py-1 text-black">
              <CheckSquareIcon size={12} />
              <p className="text-xs">{bookInfo._count.tasks}</p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
