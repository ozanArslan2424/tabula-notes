import { HomeLink } from "@/components/buttons/action-btns";
import { BookSelector } from "@/components/buttons/book-select";
import { BookSettings } from "@/components/buttons/book-settings";
import { CreateBookButton } from "@/components/buttons/create-book";
import { NewGroupButton } from "@/components/buttons/create-group";
import { NewNoteButton } from "@/components/buttons/new-note";
import { NoteGroupTitleCard } from "@/components/cards/group-card";
import { NoteCard } from "@/components/cards/note-card";
import { TodoCard } from "@/components/cards/todo-card";
import { Nav } from "@/components/layout/side-menu";
import { getBookContents } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { BookOpenTextIcon, CalendarIcon, TextIcon } from "lucide-react";
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

  if (user) {
    return (
      <div className="flex">
        <Nav>
          <div className="flex flex-col gap-2">
            <HomeLink />
            <CreateBookButton />
            <BookSettings currentBook={currentBook} />
            <BookSelector bookTitle={currentBook.title} />
            <div className="hidden min-h-8 items-center gap-2 rounded-md border border-input bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm sm:flex">
              <TextIcon size={14} className="shrink-0" />
              <p className="hyphens-auto text-wrap break-words">{currentBook.description}</p>
            </div>
            <div className="hidden h-8 w-max items-center gap-2 rounded-md border border-input bg-muted px-3 text-xs font-semibold text-muted-foreground shadow-sm sm:flex">
              <CalendarIcon size={14} className="shrink-0" />
              {currentBook.createdAt.toLocaleDateString()}
            </div>
            {currentBook.hasTasks && (
              <div className="hidden sm:block">
                <TodoCard tasks={currentBook.tasks} bookId={currentBook.id} />
              </div>
            )}
          </div>
        </Nav>

        <main className="py-4 pl-2 md:pl-8">
          <h1 className="mb-4 text-2xl font-semibold">
            <BookOpenTextIcon size={24} className="mr-2 inline-block" />
            {currentBook.title}
          </h1>
          <div className="flex min-h-[calc(100dvh-120px)] max-w-[calc(100vw-40px)] gap-2 overflow-x-scroll pr-12 sm:max-w-[calc(100vw-380px)]">
            {currentBook.groups
              .sort((a, b) => a.id - b.id)
              .map((group) => {
                return (
                  <div
                    key={group.id}
                    className="flex max-h-[calc(100dvh-120px)] w-[360px] shrink-0 flex-col gap-2 overflow-y-scroll sm:w-[576px]"
                  >
                    <NoteGroupTitleCard group={group} bookId={currentBook.id} />
                    {group.notes
                      .sort((a, b) => a.id - b.id)
                      .map((note) => {
                        return <NoteCard key={note.id} bookId={bookId} groupId={group.id} note={note} />;
                      })}
                    <div className="flex w-full items-center justify-center pb-12">
                      <NewNoteButton groupId={group.id} bookId={bookId} />
                    </div>
                  </div>
                );
              })}
            <NewGroupButton bookId={currentBook.id} />
          </div>
        </main>
      </div>
    );
  }
}
