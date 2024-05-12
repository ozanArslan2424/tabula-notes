"use client";
import { deleteQuickNote } from "@/lib/actions/delete";
import { QuickNoteType } from "@/lib/types";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";

export default function QuickNoteItem({ qNote }: { qNote: QuickNoteType }) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteQNote = (noteId: number) => {
    startTransition(() => {
      deleteQuickNote(noteId);
    });
  };

  return (
    <div className="group flex w-full items-center justify-between gap-2 rounded-md border py-1 pl-3 pr-1">
      <p className="hyphens-auto text-wrap break-words">{qNote.content}</p>
      <Button
        size="sm_icon"
        variant="outline"
        className="bg-background text-foreground opacity-25 transition-all group-hover:opacity-100"
        onClick={() => handleDeleteQNote(qNote.id)}
      >
        {isPending ? <LoadingIcon /> : <Trash2Icon size={14} className="shrink-0 text-destructive" />}
      </Button>
    </div>
  );
}
