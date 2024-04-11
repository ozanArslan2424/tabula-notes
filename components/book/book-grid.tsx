"use client";
import { CreateBookButton } from "@/components/book/create-book";
import { Input } from "@/components/ui/input";
import { Book } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { BookCard } from "./book-card";

type Props = { books: Book[] | undefined };

export const BookCardsGrid = ({ books }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="mb-4 flex w-full flex-wrap justify-center gap-2 md:justify-normal">
        <CreateBookButton mode="default" />
        <div className="relative">
          <SearchIcon size={14} className="absolute left-3 top-2.5" />
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="search"
            name="search"
            placeholder="Kitapları filtrele"
            className="w-max border border-input bg-background pl-9 text-xs capitalize text-foreground shadow-sm transition-all md:min-w-60"
          />
        </div>
      </div>

      {books?.length !== 0 && books !== undefined ? (
        <div className="flex w-full flex-wrap justify-center gap-4 md:justify-normal">
          {books
            .filter((book) => book.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
            .map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-lg border bg-card p-4 shadow">
          <p className="text-muted-foreground">Henüz hiç kitap eklenmemiş.</p>
        </div>
      )}
    </>
  );
};
