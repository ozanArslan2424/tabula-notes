import { getBookContents } from "@/actions/read";
import { getCurrentUser } from "@/actions/user";
import { HomeLink } from "@/components/buttons/action-btns";
import { BookSelector } from "@/components/buttons/book-select";
import { BookSettings } from "@/components/buttons/book-settings";
import { CreateBookButton } from "@/components/buttons/create-book";
import { NewGroupButton } from "@/components/buttons/create-group";
import { NoteGroupTitleCard } from "@/components/cards/group-card";
import { TodoCard } from "@/components/cards/todo-card";
import { CalendarIcon, TextIcon } from "lucide-react";
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
    <div className="flex w-full flex-col gap-4 md:px-8 lg:px-16">
      <nav className="mx-auto flex items-center gap-2 sm:mx-0">
        <HomeLink />
        <CreateBookButton />
        <BookSettings currentBook={currentBook} />
        <BookSelector bookTitle={currentBook.title} />
        <div className="hidden h-7 min-w-40 items-center gap-2 rounded-md border border-input bg-muted px-3 text-xs font-semibold text-muted-foreground shadow-sm sm:flex">
          <TextIcon size={14} />
          {currentBook.description}
        </div>
        <div className="hidden h-7 w-max items-center gap-2 rounded-md border border-input bg-muted px-3 text-xs font-semibold text-muted-foreground shadow-sm sm:flex">
          <CalendarIcon size={14} />
          {currentBook.createdAt.toLocaleDateString()}
        </div>
      </nav>
      <div className="flex flex-col gap-2 sm:flex-row">
        {currentBook.hasTasks && <TodoCard tasks={currentBook.tasks} bookId={currentBook.id} />}
        <div className="flex min-h-screen gap-2 overflow-scroll">
          {currentBook.groups
            .sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
            .map((group) => {
              return <NoteGroupTitleCard group={group} bookId={currentBook.id} key={group.id} />;
            })}
          <NewGroupButton bookId={currentBook.id} />
        </div>
      </div>
    </div>
  );
}
