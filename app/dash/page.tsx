import { BookCardsGrid } from "@/components/book/book-grid";
import { QuickNoteCard } from "@/components/quick-note/quick-note-card";
import { QuickNoteForm } from "@/components/quick-note/quick-note-form";
import { getAllBooks, getQuickNotes } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashPage() {
  const { user } = await getSession();
  if (!user) redirect("/login");

  const books = await getAllBooks(user.id);
  const quickNotes = await getQuickNotes(user.id);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col justify-between">
      <div className="flex w-full flex-col justify-center gap-8 px-8 py-4 md:flex-row md:items-start">
        <aside className="mb-8 flex flex-col items-center gap-4 md:items-start">
          <h1 className="text-2xl font-semibold tracking-tight md:text-start">Hızlı Notlar</h1>
          <QuickNoteForm />
          <div className="flex w-full flex-col items-center gap-2">
            {quickNotes && quickNotes.map((note) => <QuickNoteCard key={note.id} note={note} />)}
          </div>
        </aside>
        <main className="md:mx-auto md:w-[1150px]">
          <div>
            <h1 className="mb-4 text-2xl font-semibold tracking-tight md:text-start">Kütüphane</h1>
            <BookCardsGrid books={books} />
          </div>
        </main>
      </div>
      <footer className="py-2">
        <p className="text-center text-xs text-muted-foreground">
          <Link href="https://github.com/ozanArslan2424">Ozan Arslan</Link> © 2024
        </p>
      </footer>
    </div>
  );
}
