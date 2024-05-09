"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookType } from "@/lib/types";
import { BookOpenTextIcon, ChevronDownIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { BookSettings } from "./book-settings-form";
import { CreateBookButton } from "./create-book";

export const BookSelector = async ({
  bookList,
  currentBook,
}: {
  bookList: { id: string; title: string }[];
  currentBook: BookType;
}) => {
  const bookListMemo = useMemo(() => {
    return bookList.filter((book) => book.id !== currentBook.id);
  }, [bookList, currentBook]);

  const currentBookMemo = useMemo(() => {
    return {
      ...currentBook,
    };
  }, [currentBook]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <div className="card secondary group cursor-pointer data-[state=open]:bg-secondary/50"> */}
        <div className="group flex min-h-12 cursor-pointer items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <BookOpenTextIcon size={24} />
            <h1 className="text-xl font-semibold capitalize tracking-tight">{currentBookMemo.title}</h1>
          </div>
          <ChevronDownIcon size={24} className="group-data-[state=open]:rotate-180" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <Link href="/dash">
          <DropdownMenuItem className="gap-2 font-semibold">
            <HomeIcon size={18} className="shrink-0" />
            <span>Kütüphane</span>
          </DropdownMenuItem>
        </Link>
        <BookSettings book={currentBookMemo} mode="full" />
        <CreateBookButton mode="menu" />

        <DropdownMenuSeparator />
        <DropdownMenuGroup title="Kitaplar">
          {bookListMemo &&
            bookListMemo.map((book) => {
              return (
                <Link href={`/dash/${book.id}`} key={book.id}>
                  <DropdownMenuItem className="min-w-48 text-sm capitalize">{book.title}</DropdownMenuItem>
                </Link>
              );
            })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
