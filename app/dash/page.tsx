import BookList from "@/components/book/book-list";
import QuickNoteList from "@/components/quick-note/quick-note-list";
import { getAllBookInfo, getQuickNotes } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashPage() {
  const { user } = await getSession();
  if (!user) redirect("/login");

  const books = await getAllBookInfo(user.id);
  const quickNotes = await getQuickNotes(user.id);

  return (
    <div className="items-start gap-12 px-6 pt-4 md:flex">
      <aside className="mb-8 space-y-2 text-center md:text-left">
        <QuickNoteList quickNotes={quickNotes} />
      </aside>

      <main className="mb-8 grow space-y-2 text-center md:text-left">
      <Link href="https://tabulanotes.vercel.app"><span className="text-2xl my-4">YENİ ADRESE GİT: <code>https://tabulanotes.vercel.app</code></span></Link>

        <BookList books={books} userId={user.id} />
      </main>
    </div>
  );
}
