import { QuickNoteCard } from "@/components/cards/quick-note-card";
import { QuickNoteForm } from "@/components/forms/quick-note-form";
import { BookCardsGrid } from "@/components/layout/book-grid";
import { getAllBooks, getQuickNotes } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashPage() {
  const { user } = await getSession();
  if (!user) redirect("/login");

  const books = await getAllBooks(user.id);
  const quickNotes = await getQuickNotes(user.id);

  return (
    <main className="w-full px-4 py-8 md:mx-auto md:w-[1150px]">
      <h1 className="mb-4 text-center text-2xl font-semibold md:text-start">Hızlı Notlar</h1>
      <QuickNoteForm />
      <div className="mb-8 flex w-full flex-wrap items-start gap-2">
        {quickNotes && quickNotes.map((note) => <QuickNoteCard key={note.id} note={note} />)}
      </div>

      <h1 className="mb-4 text-center text-2xl font-semibold md:text-start">Kütüphane</h1>
      <BookCardsGrid books={books} />
    </main>
  );
}
