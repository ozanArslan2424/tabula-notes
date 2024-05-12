import { BookMenu } from "@/components/book/book-menu";
import CreateNoteButton from "@/components/note/create-note";
import NoteList from "@/components/note/note-list";
import { getBookContent, getBookList } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function BookPage({
  params: { bookId },
}: {
  params: {
    bookId: string;
  };
}) {
  const { user } = await getSession();
  if (!user) redirect("/login");

  const currentBook = await getBookContent(bookId);
  const bookList = await getBookList(user.id);

  if (!currentBook || currentBook.userId !== user.id) redirect("/dash");

  return (
    <div
      className={cn(
        "grid w-full",
        "md:h-[calc(100dvh-48px)] md:max-h-[calc(100dvh-48px)] md:grid-flow-col md:grid-cols-[240px_auto] md:grid-rows-1",
        "h-[100dvh] max-h-[100dvh] grid-flow-row grid-cols-1 grid-rows-[56px_calc(100dvh-56px)] overflow-y-hidden",
      )}
    >
      <BookMenu user={user} bookList={bookList} currentBook={currentBook} />

      <main className="flex snap-x snap-mandatory overflow-x-scroll">
        <NoteList notes={currentBook.notes} />
        <CreateNoteButton bookId={currentBook.id} />
      </main>
    </div>
  );
}
