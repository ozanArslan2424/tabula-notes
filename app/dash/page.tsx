import BookList from "@/components/book/book-list";
import QuickNoteList from "@/components/quick-note/quick-note-list";
import { getAllBookInfo, getQuickNotes } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashPage() {
  const { user } = await getSession();
  if (!user) redirect("/login");

  const books = await getAllBookInfo(user.id);
  const quickNotes = await getQuickNotes(user.id);

  return (
    <div className="items-start gap-12 px-6 md:flex md:pt-4">
      <aside className="mb-8 space-y-2 text-center md:text-left">
        <QuickNoteList quickNotes={quickNotes} />
      </aside>

      <main className="mb-8 space-y-2 text-center md:text-left">
        <BookList books={books} />
      </main>
    </div>

    // <footer>
    //   <p className="text-center text-xs text-muted-foreground">
    //     <Link href="https://ozanarslan.vercel.app">Ozan Arslan</Link> © 2024
    //   </p>
    // </footer>
  );
}
