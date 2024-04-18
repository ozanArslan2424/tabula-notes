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
import { BookOpenTextIcon, ChevronDownIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { BookSettings } from "./book-settings-form";
import { CreateBookButton } from "./create-book";

export const BookSelector = async ({ bookTitle, currentBook }: { bookTitle: string; currentBook: BookType }) => {
  const { user } = await getSession();
  const books = await getAllBooks(user?.id!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group flex w-max cursor-pointer items-center gap-2 rounded-sm px-4 py-2 hover:bg-accent/50">
          <BookOpenTextIcon size={24} />
          <h1 className="text-2xl font-semibold tracking-tight">{bookTitle}</h1>
          <ChevronDownIcon size={24} className="group-data-[state=open]:rotate-180" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
