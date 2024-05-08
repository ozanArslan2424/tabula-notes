import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllBooks } from "@/lib/actions/read";
import { BookType } from "@/lib/types";
import { BookOpenTextIcon, ChevronDownIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { BookSettings } from "./book-settings-form";
import { CreateBookButton } from "./create-book";

export const BookSelector = async ({
  userId,
  bookTitle,
  currentBook,
}: {
  userId: string;
  bookTitle: string;
  currentBook: BookType;
}) => {
  const books = await getAllBooks(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="card secondary group cursor-pointer data-[state=open]:bg-secondary/50">
          <div className="flex items-center gap-2">
            <BookOpenTextIcon size={24} />
            <h1 className="text-2xl font-semibold capitalize tracking-tight">{bookTitle}</h1>
          </div>
          <ChevronDownIcon size={24} className="group-data-[state=open]:rotate-180" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent alignOffset={8} align="center">
        <Link href="/dash">
          <DropdownMenuItem className="gap-2 font-semibold">
            <HomeIcon size={18} className="shrink-0" />
            <span>Kütüphane</span>
          </DropdownMenuItem>
        </Link>
        <BookSettings book={currentBook} mode="full" />
        <CreateBookButton mode="menu" />

        <DropdownMenuSeparator />
        <DropdownMenuGroup title="Kitaplar">
          {books &&
            books.map((book) => {
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
