"use client";
import { BookInfoType } from "@/lib/types";
import { useMemo } from "react";
import BatchCreate from "../create/batch";
import BookItem from "./book-item";
import CreateBookButton from "./create-book";

type Props = {
  books: BookInfoType[];
  userId: string;
};

export default function BookList({ books, userId }: Props) {
  const booksMemo = useMemo(
    () =>
      books.map((book) => {
        return {
          ...book,
        };
      }),
    [books],
  );
  return (
    <>
      <h1 className="pb-2 text-2xl font-semibold tracking-tight">Kütüphane</h1>
      <div className="flex items-center gap-2">
        <CreateBookButton mode="default" />
        <BatchCreate userId={userId} />
      </div>
      <div className="flex h-full w-full flex-wrap justify-center gap-4 pt-2 md:justify-normal">
        {booksMemo.length !== 0 ? (
          booksMemo
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((book) => <BookItem key={book.id} book={book} />)
        ) : (
          <p className="grid min-h-36 w-full items-center justify-center rounded-md border bg-muted text-muted-foreground md:w-[360px]">
            Henüz hiç kitap eklenmemiş.
          </p>
        )}
      </div>
    </>
  );
}
