import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllBooks } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { BookOpenTextIcon } from "lucide-react";
import Link from "next/link";

export const BookSelector = async ({ bookTitle }: { bookTitle: string }) => {
  const { user } = await getSession();
  const books = await getAllBooks(user?.id!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="mx-2 mt-2 flex w-max cursor-pointer items-center gap-2 px-4 py-2 hover:bg-accent/50 md:mx-4">
          <BookOpenTextIcon size={24} />
          <h1 className="text-2xl font-semibold tracking-tight">{bookTitle}</h1>
        </div>
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
