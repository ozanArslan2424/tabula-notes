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
import { BookOpenTextIcon, ChevronDownIcon, HomeIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import BookSettings from "./book-settings";
import CreateBookButton from "./create-book";

export default function BookSelector({
  bookList,
  currentBook,
}: {
  bookList: { id: string; title: string }[];
  currentBook: BookType;
}) {
  const bookListMemo = useMemo(() => {
    return bookList.filter((book) => book.id !== currentBook.id);
  }, [bookList, currentBook]);

  const currentBookMemo = useMemo(() => {
    return { ...currentBook };
  }, [currentBook]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group flex min-h-[60px] cursor-pointer items-center justify-between border-b border-primary/10 px-6 py-4 hover:bg-accent/50">
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
        <BookSettings
          bookId={currentBookMemo.id}
          bookTitle={currentBookMemo.title}
          bookDescription={currentBookMemo.description}
          bookHasTasks={currentBookMemo.hasTasks}
        >
          <div className="flex items-center gap-2">
            <Settings2Icon size={18} className="shrink-0" />
            <span>Kitap Ayarları</span>
          </div>
        </BookSettings>
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
}
