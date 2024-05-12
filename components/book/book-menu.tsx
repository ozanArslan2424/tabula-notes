"use client";
import UserButton from "@/components/auth/user-button";
import BookSelector from "@/components/book/book-select";
import NoteNavigation from "@/components/note/note-nav";
import ThemeToggle from "@/components/switch-theme";
import TodoList from "@/components/todo/todo-list";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/lib/hooks/use-media";
import { BookType, UserType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  user: UserType;
  bookList: { id: string; title: string }[];
  currentBook: BookType;
};

export const BookMenu = ({ user, bookList, currentBook }: Props) => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const bookListMemo = useMemo(
    () =>
      bookList.map((book) => {
        return { ...book };
      }),
    [bookList],
  );

  const currentBookMemo = useMemo(() => {
    return { ...currentBook };
  }, [currentBook]);

  if (!user) return null;

  if (isLargeScreen)
    return (
      <aside
        className={cn(
          "col-span-1 overflow-y-scroll border-r border-primary/10 bg-accent/50 text-accent-foreground",
          "hidden md:block",
        )}
      >
        <BookSelector bookList={bookListMemo} currentBook={currentBookMemo} />
        <NoteNavigation currentBook={currentBookMemo} />
        {currentBookMemo.hasTasks && currentBookMemo.tasks && (
          <TodoList bookId={currentBookMemo.id} tasks={currentBookMemo.tasks} userId={user.id} />
        )}
      </aside>
    );

  return (
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
        <SheetContent side="left" className="w-[80vw] p-0">
          <div className="overflow-y-scroll">
            <div className="w-full bg-accent/50 p-4">
              <Link href={user ? "/login" : "/dash"} className="text-xl font-bold">
                Tabula
              </Link>
            </div>
            <BookSelector bookList={bookListMemo} currentBook={currentBookMemo} />
            <NoteNavigation currentBook={currentBookMemo} />
            {currentBookMemo.hasTasks && currentBookMemo.tasks && (
              <TodoList bookId={currentBookMemo.id} tasks={currentBookMemo.tasks} userId={user.id} />
            )}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton user={user} />
      </div>
    </header>
  );
};
