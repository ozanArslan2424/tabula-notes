import { getAllBooks } from "@/actions/read";
import { BookCardsGrid } from "@/components/layout/book-grid";

export default async function DashPage() {
  const books = await getAllBooks();

  return <BookCardsGrid books={books} />;
}
