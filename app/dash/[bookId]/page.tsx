import { BookSelector } from "@/components/book/book-select";
import { NewGroupButton } from "@/components/group/create-group";
import { GroupList } from "@/components/group/group-list";
import NoteList from "@/components/note/note-list";
import TodoList from "@/components/todo/todo-list";
import { getBookContent, getBookList } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
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
    <div className="flex h-[calc(100dvh-48px)] max-h-[calc(100dvh-48px)] w-full gap-8 overflow-x-scroll pl-2 pr-56 md:pl-4">
      <nav className="w-64 min-w-64 space-y-2 overflow-y-scroll">
        <BookSelector bookList={bookList} currentBook={currentBook} />
        <GroupList currentBook={currentBook} />
        {currentBook.hasTasks && <TodoList bookId={currentBook.id} tasks={currentBook.tasks} />}
      </nav>

      <main className="flex items-start gap-2">
        <NoteList bookId={currentBook.id} groups={currentBook.groups} />
        <NewGroupButton bookId={currentBook.id} />
      </main>
    </div>
  );
}
