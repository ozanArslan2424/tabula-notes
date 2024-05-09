"use client";
import { QuickNoteType } from "@/lib/types";
import { useMemo } from "react";
import { QuickNoteForm } from "./quick-note-form";
import { QuickNoteItem } from "./quick-note-item";

type Props = {
  quickNotes: QuickNoteType[];
};

export default function QuickNoteList({ quickNotes }: Props) {
  const quickNotesMemo = useMemo(
    () =>
      quickNotes.map((qNote) => {
        return {
          ...qNote,
        };
      }),
    [quickNotes],
  );
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Hızlı Notlar</h1>
      <QuickNoteForm className="flex w-full items-center gap-2 py-2" />
      {quickNotesMemo.map((qNote) => (
        <QuickNoteItem key={qNote.id} note={qNote} />
      ))}
    </>
  );
}
