import { BookSelector } from "@/components/buttons/book-select";
import { NewNoteButton } from "@/components/buttons/new-note-button";
import { NoteGroupTitleCard } from "@/components/cards/group-card";
import { NoteCard } from "@/components/cards/note-card";
import { TodoCard } from "@/components/cards/todo-card";
import { CreateBookButton } from "@/components/forms/book-form";
import { BookSettings } from "@/components/forms/book-settings-form";
import { NewGroupButton } from "@/components/forms/group-form";
import { LinkButton } from "@/components/ui/link-button";
import { getBookContents } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { CalendarIcon, HomeIcon, TextIcon } from "lucide-react";
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
    <div className="flex w-full flex-col items-center md:items-start">
      <BookSelector bookTitle={currentBook.title} />

      <nav className="mb-4 mt-2 flex flex-wrap justify-start gap-2 px-2 md:px-4">
        <LinkButton
          className="w-max justify-start space-x-3 bg-background text-foreground"
          size="sm"
          variant="outline"
          href="/dash"
        >
          <HomeIcon size={14} className="shrink-0" />
          <span className="hidden sm:inline">Kütüphane</span>
        </LinkButton>
        <CreateBookButton />
        <BookSettings currentBook={currentBook} />
        <div className="flex h-8 w-max items-center gap-2 rounded-md border border-input px-3 text-xs font-semibold text-muted-foreground shadow-sm">
          <CalendarIcon size={14} className="shrink-0" />
          {currentBook.createdAt.toLocaleDateString()}
        </div>
        <div className="flex min-h-8 items-center gap-2 rounded-md border border-input px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
          <TextIcon size={14} className="shrink-0" />
          <p className="hyphens-auto text-wrap break-words">{currentBook.description}</p>
        </div>
      </nav>

      {currentBook.hasTasks && <TodoCard tasks={currentBook.tasks} bookId={currentBook.id} />}

      <main className="flex h-[calc(100dvh-64px)] w-full max-w-[100vw] gap-2 overflow-x-scroll pl-2 pr-56 md:pl-4">
        {currentBook.groups
          .sort((a, b) => a.id - b.id)
          .map((group) => {
            return (
              <div
                key={group.id}
                className="flex h-full w-[360px] shrink-0 flex-col gap-2 overflow-y-scroll sm:w-[576px]"
              >
                <NoteGroupTitleCard group={group} bookId={currentBook.id} />
                {group.notes
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
