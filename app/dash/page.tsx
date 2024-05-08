import { BookCard } from "@/components/book/book-card";
import { CreateBookButton } from "@/components/book/create-book";
import { QuickNoteCard } from "@/components/quick-note/quick-note-card";
import { QuickNoteForm } from "@/components/quick-note/quick-note-form";
import { getAllBooks, getQuickNotes } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashPage() {
  const { user } = await getSession();
  if (!user) redirect("/login");

  const books = await getAllBooks(user.id);
  const qNotes = await getQuickNotes(user.id);

  return (
    <div className="flex-row items-start gap-12 px-6 md:flex md:pt-4">
      <aside className="mb-8 space-y-2 text-center md:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">Hızlı Notlar</h1>
        <QuickNoteForm className="flex w-full items-center gap-2 py-2" />
        {qNotes.map((qNote) => (
          <QuickNoteCard key={qNote.id} note={qNote} />
        ))}
      </aside>

      <main className="mb-8 space-y-2 text-center md:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">Kütüphane</h1>
        <div className="py-2">
          <CreateBookButton mode="default" />
        </div>
        {/* <BookCardsGrid books={books} /> */}
        <div className="flex w-full flex-wrap justify-center gap-4 md:justify-normal">
          {books.length !== 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="text-muted-foreground">Henüz hiç kitap eklenmemiş.</p>
          )}
        </div>
      </main>
    </div>

    // <footer>
    //   <p className="text-center text-xs text-muted-foreground">
    //     <Link href="https://ozanarslan.vercel.app">Ozan Arslan</Link> © 2024
    //   </p>
    // </footer>
  );
}
