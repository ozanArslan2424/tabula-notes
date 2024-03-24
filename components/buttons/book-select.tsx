import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllBooks } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const BookSelector = async ({ bookTitle }: { bookTitle: string }) => {
  const { user } = await getSession();
  const books = await getAllBooks(user?.id!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-8 w-full items-center justify-center rounded-md border border-input bg-background px-3 shadow-sm">
        <p className="text-xs font-semibold capitalize">
          <span className="text-muted-foreground">Seçili kitap: </span> {bookTitle}
        </p>
        <ChevronDown size={14} className="custom-rotate ml-auto shrink-0 transition-all" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {books &&
          books.map((book) => {
            return (
              <Link href={`/dash/${book.id}`} key={book.id}>
                <DropdownMenuItem className="min-w-48 text-xs capitalize">{book.title}</DropdownMenuItem>
              </Link>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
