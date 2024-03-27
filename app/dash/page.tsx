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
      <main className="w-full px-4 py-8 md:mx-auto md:w-[1150px]">
        <h1 className="mb-4 text-center text-2xl font-semibold md:text-start">Hızlı Notlar</h1>
        <QuickNoteForm />
        <div className="mb-8 flex w-full flex-wrap items-start gap-2">
          {quickNotes && quickNotes.map((note) => <QuickNoteCard key={note.id} note={note} />)}
        </div>

        <h1 className="mb-4 text-center text-2xl font-semibold md:text-start">Kütüphane</h1>
        <BookCardsGrid books={books} />
      </main>
      <footer className="py-2">
        <p className="text-center text-xs text-muted-foreground">
          <Link href="https://github.com/ozanArslan2424">Ozan Arslan</Link> © 2024
        </p>
      </footer>
    </div>
  );
}
