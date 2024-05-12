"use client";
import { NoteType } from "@/lib/types";
import { cn, toSnakeCase } from "@/lib/utils";
import { useMemo } from "react";
import NoteItem from "./note-item";

type Props = {
  notes: NoteType[];
};

export default function NoteList({ notes }: Props) {
  const notesMemo = useMemo(
    () =>
      notes.map((note) => {
        return {
          ...note,
        };
      }),
    [notes],
  );

  return (
    <>
      {notesMemo
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((note) => {
          return (
            <section
              id={toSnakeCase(note.title)}
              key={note.id}
              className={cn(
                "shrink-0 snap-start overflow-y-scroll",
                "border-b border-r border-primary/10 shadow-sm",
                "max-h-[calc(100dvh-56px)] w-screen md:max-h-[calc(100dvh-48px)] md:w-[48vw]",
              )}
            >
              <NoteItem key={note.id} note={note} />
            </section>
          );
        })}
    </>
  );
}
