import { getAllBooks } from "@/actions/read";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const BookSelector = async ({ bookTitle }: { bookTitle: string }) => {
  const books = await getAllBooks();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background shadow-sm sm:w-full sm:px-3">
        <p className="hidden text-xs font-semibold capitalize sm:block">
          <span className="text-muted-foreground">Seçili kitap: </span> {bookTitle}
        </p>
        <ChevronDown size={14} className="custom-rotate shrink-0 transition-all sm:ml-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {books &&
          books.map((book) => {
            return (
              <Link href={`/dash/${book.id}`} key={book.id}>
                <DropdownMenuItem className="min-w-48 text-xs capitalize">
                  {book.title}
                </DropdownMenuItem>
              </Link>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
