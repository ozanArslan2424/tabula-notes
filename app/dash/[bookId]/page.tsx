import { getBookContents } from "@/actions/read";
import { getCurrentUser } from "@/actions/user";
import { HomeLink } from "@/components/buttons/action-btns";
import { BookSelector } from "@/components/buttons/book-select";
import { BookSettings } from "@/components/buttons/book-settings";
import { CreateBookButton } from "@/components/buttons/create-book";
import { NewGroupButton } from "@/components/buttons/create-group";
import { NoteGroupTitleCard } from "@/components/cards/group-card";
import { TodoCard } from "@/components/cards/todo-card";
import { Nav } from "@/components/layout/side-menu";
import { BookOpenTextIcon, CalendarIcon, TextIcon } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  params: {
    bookId: string;
  };
};

export default async function BookPage({ params: { bookId } }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const currentBook = await getBookContents(bookId);
  if (!currentBook) return null;

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
          {currentBook.hasTasks && <TodoCard tasks={currentBook.tasks} bookId={currentBook.id} />}
        </div>
      </Nav>
      <main className="px-2 py-4 md:px-8">
        <h1 className="mb-8 text-2xl font-semibold">
          <BookOpenTextIcon size={24} className="mr-2 inline-block" />
          {currentBook.title}
        </h1>
        <div className="flex min-h-screen gap-2 overflow-scroll">
          {currentBook.groups
            .sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
            .map((group) => {
              return <NoteGroupTitleCard group={group} bookId={currentBook.id} key={group.id} />;
            })}
          <NewGroupButton bookId={currentBook.id} />
        </div>
      </main>
    </div>
  );
}
