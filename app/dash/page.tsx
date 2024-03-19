import { BookCardsGrid } from "@/components/layout/book-grid";
import { getAllBooks } from "@/lib/actions/read";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

export default async function DashPage() {
  const books = await getAllBooks();
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user) {
    return <BookCardsGrid books={books} />;
  }
}
