import { BookSelector } from "@/components/book/book-select";
import { NewGroupButton } from "@/components/group/create-group";
import { GoToGroup } from "@/components/group/go-to-group";
import { NoteGroupTitleCard } from "@/components/group/group-card";
import { NewNoteButton } from "@/components/note/create-note";
import { NoteCard } from "@/components/note/note-card";
import { TodoCard } from "@/components/todo/todo-card";
import { getBookContents } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { toSnakeCase } from "@/lib/utils";
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

  const currentBook = await getBookContents(bookId);
  if (!currentBook) return null;
  if (currentBook.userId !== user.id) redirect("/dash");

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] w-full flex-col items-start">
      <nav className="px-4 py-2">
        <BookSelector bookTitle={currentBook.title} currentBook={currentBook} />
      </nav>
      <main className="flex w-full max-w-[100vw] gap-2 overflow-x-scroll pl-2 pr-56 md:pl-4">
        <div className="space-y-2">
          {currentBook.hasTasks && <TodoCard tasks={currentBook.tasks} bookId={currentBook.id} />}
          <GoToGroup currentBook={currentBook} />
        </div>

        {currentBook.groups
          .sort((a, b) => a.id - b.id)
          .map((group) => {
            const notes = group.notes;
            const groupIdSnake = toSnakeCase(group.title);

            return (
              <div
                id={groupIdSnake}
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
