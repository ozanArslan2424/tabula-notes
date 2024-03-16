import { getAllBooks } from "@/actions/read";
import { BookCardsGrid } from "@/components/layout/book-grid";
import { Book } from "@prisma/client";

export default async function DashPage() {
  const books = await getAllBooks();

  return <BookCardsGrid books={books as Book[]} />;
}
