"use client";
import { Input } from "@/components/ui/input";
import { Book } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { HomeLink, SettingsLink } from "../buttons/action-btns";
import { BookCard, NewBookCard } from "../cards/book-card";

type Props = { books: Book[] };

export const BookCardsGrid = ({ books }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="mx-auto flex flex-col gap-4">
      <nav className="flex items-center gap-2">
        <HomeLink />
        <SettingsLink />
        <div className="relative">
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="text"
            name="search"
            placeholder="Kitapları filtrele"
            className="h-7 border border-input bg-background pl-7 text-xs capitalize text-foreground shadow-sm transition-all lg:focus:w-96"
          />
          <SearchIcon size={12} className="absolute left-2 top-2" />
        </div>
      </nav>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books
          .filter((book) => book.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
          .map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        <NewBookCard />
      </div>
    </div>
  );
};
