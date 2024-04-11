import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllBooks } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { BookType } from "@/lib/types";
import { BookOpenTextIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { BookSettings } from "./book-settings-form";
import { CreateBookButton } from "./create-book";

export const BookSelector = async ({ bookTitle, currentBook }: { bookTitle: string; currentBook: BookType }) => {
  const { user } = await getSession();
  const books = await getAllBooks(user?.id!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group flex w-max cursor-pointer items-center gap-2 px-4 py-2 hover:bg-accent/50">
          <BookOpenTextIcon size={24} />
          <h1 className="text-2xl font-semibold tracking-tight">{bookTitle}</h1>
          <ChevronDownIcon size={24} className="group-data-[state=open]:rotate-180" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
