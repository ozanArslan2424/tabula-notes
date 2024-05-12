import UserButton from "@/components/auth/user-button";
import BookSelector from "@/components/book/book-select";
import CreateNoteButton from "@/components/note/create-note";
import NoteList from "@/components/note/note-list";
import NoteNavigation from "@/components/note/note-nav";
import ThemeToggle from "@/components/switch-theme";
import TodoList from "@/components/todo/todo-list";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getBookContent, getBookList } from "@/lib/actions/read";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
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
        "md:h-[calc(100dvh-48px)] md:max-h-[calc(100dvh-48px)] md:grid-flow-col md:grid-cols-[240px_auto] md:grid-rows-[calc(100dvh-48px)]",
        "h-[100dvh] max-h-[100dvh] grid-flow-row grid-cols-[calc(100dvh-48px)] grid-rows-[56px_auto]",
      )}
    >
      <header
        className={cn(
          "row-span-1 w-full border-b border-primary/10 bg-accent/50 px-4 text-accent-foreground",
          "flex items-center justify-between md:hidden",
        )}
      >
        <Sheet>
          <SheetTrigger asChild>
            <button className="inline-flex aspect-square h-8 items-center justify-center rounded-md border border-primary/10 p-2">
              <HamburgerMenuIcon />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="overflow-y-scroll">
              <div className="p-4">
                <Link href={user ? "/login" : "/dash"}>
                  <h1 className="text-xl font-bold">Tabula</h1>
                </Link>
              </div>
              <BookSelector bookList={bookList} currentBook={currentBook} />
              <NoteNavigation currentBook={currentBook} />
              {currentBook.hasTasks && currentBook.tasks && user && (
                <TodoList bookId={currentBook.id} tasks={currentBook.tasks} userId={user.id} />
              )}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserButton user={user} />
        </div>
      </header>

      <aside
        className={cn(
          "col-span-1 overflow-y-scroll border-r border-primary/10 bg-accent/50 text-accent-foreground",
          "hidden md:block",
        )}
      >
        <BookSelector bookList={bookList} currentBook={currentBook} />
        <NoteNavigation currentBook={currentBook} />
        {currentBook.hasTasks && <TodoList bookId={currentBook.id} tasks={currentBook.tasks} userId={user.id} />}
      </aside>

      <main className="flex snap-x snap-mandatory overflow-x-scroll">
        <NoteList notes={currentBook.notes} />
        <CreateNoteButton bookId={currentBook.id} />
      </main>
    </div>
  );
}
