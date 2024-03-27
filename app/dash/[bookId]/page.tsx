import { BookSelector } from "@/components/buttons/book-select";
import { NoteGroupTitleCard } from "@/components/cards/group-card";
import { NoteCard } from "@/components/cards/note-card";
import { TodoCard } from "@/components/cards/todo-card";
import { NewGroupButton, NewNoteButton, NotesButtons } from "@/components/layout/notes-buttons";
import { getBookContents } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    bookId: string;
  };
};

export default async function BookPage({ params: { bookId } }: Props) {
  const currentBook = await getBookContents(bookId);
  if (!currentBook) return null;

  const { user } = await getSession();
  if (!user) redirect("/login");

  return (
    <div className="flex max-h-[100dvh] w-full flex-col items-center md:items-start">
      <BookSelector bookTitle={currentBook.title} />
      {currentBook.hasTasks && <TodoCard tasks={currentBook.tasks} bookId={currentBook.id} />}
      <NotesButtons currentBook={currentBook} />
      <main className="flex h-[calc(100dvh-64px)] w-full max-w-[100vw] gap-2 overflow-x-scroll pl-2 pr-56 md:pl-4">
        {currentBook.groups
          .sort((a, b) => a.id - b.id)
          .map((group) => {
            const notes = group.notes;
            return (
              <div
                key={group.id}
                className="flex h-full w-[360px] shrink-0 flex-col gap-2 overflow-y-scroll sm:w-[576px]"
              >
                <NoteGroupTitleCard group={group} bookId={currentBook.id} />
                {notes
                  .sort((a, b) => a.id - b.id)
                  .map((note) => {
                    return <NoteCard key={note.id} bookId={currentBook.id} groupId={group.id} note={note} />;
                  })}
                <div className="flex w-full items-center justify-center pb-12">
                  <NewNoteButton groupId={group.id} bookId={currentBook.id} />
                </div>
              </div>
            );
          })}
        <NewGroupButton bookId={currentBook.id} />
      </main>
    </div>
  );
}
