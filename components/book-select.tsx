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
      <DropdownMenuTrigger className="flex h-7 min-w-56 items-center rounded-md border border-input bg-background px-3 shadow-sm">
        <p className="text-xs font-semibold capitalize">
          <span className="text-muted-foreground">Seçili kitap: </span> {bookTitle}
        </p>
        <ChevronDown size={14} className="custom-rotate ml-auto transition-all" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40 text-xs">
        {books &&
          books.map((book) => {
            return (
              <Link href={`/dash/${book.id}`} key={book.id}>
                <DropdownMenuItem className="text-xs capitalize">{book.title}</DropdownMenuItem>
              </Link>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
