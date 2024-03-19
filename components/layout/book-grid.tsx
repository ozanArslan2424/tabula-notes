"use client";
import { Input } from "@/components/ui/input";
import { Book } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { SettingsLink } from "../buttons/action-btns";
import { CreateBookButton } from "../buttons/create-book";
import { BookCard } from "../cards/book-card";
import { Nav } from "./side-menu";

type Props = { books: Book[] | undefined };

export const BookCardsGrid = ({ books }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex">
      <Nav>
        <div className="flex flex-col gap-2">
          <div className="relative hidden sm:block">
            <SearchIcon size={14} className="absolute left-3 top-2" />
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              type="text"
              name="search"
              placeholder="Kitapları filtrele"
              className="h-8 border border-input bg-background pl-9 text-xs capitalize text-foreground shadow-sm transition-all"
            />
          </div>
          <SettingsLink />
          <CreateBookButton />
        </div>
      </Nav>
      <main className="px-2 py-4 md:px-8">
        <h1 className="mb-4 text-2xl font-semibold">Kütüphane</h1>
        {books?.length === 0 && (
          <div className="flex items-center justify-center rounded-lg border bg-card p-4 shadow">
            <p className="text-muted-foreground">Henüz hiç kitap eklenmemiş.</p>
          </div>
        )}
        {books !== undefined && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {books
              .filter((book) => book.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
              .map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
          </div>
        )}
      </main>
    </div>
  );
};
