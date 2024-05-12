"use client";
import { updateNoteTitle } from "@/lib/actions/update";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";

type Props = {
  noteTitle: string;
  noteId: number;
};

export default function NoteTitle({ noteTitle, noteId }: Props) {
  const [editing, setEditing] = useState(false);
  const [titleState, setTitleState] = useState(noteTitle);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateNoteTitle(noteId, titleState).then((res) => {
      if (res.success) {
        setEditing(false);
      }
      if (res.error) {
        toast.error(res.error);
      }
    });
  };

  if (editing)
    return (
      <form onSubmit={handleSubmit} onReset={() => setEditing(false)} className="flex items-center gap-2">
        <Input autoFocus type="text" value={titleState} onChange={(e) => setTitleState(e.target.value)} />
        <button
          type="submit"
          className="rounded-full p-2 text-emerald-500 ring-ring transition-all hover:bg-accent active:bg-accent/50"
        >
          <CheckIcon size={18} />
        </button>
        <button
          type="reset"
          className="rounded-full p-2 text-destructive ring-ring transition-all hover:bg-accent active:bg-accent/50"
        >
          <XIcon size={18} />
        </button>
      </form>
    );
  return (
    <button
      className="w-max rounded-md border border-transparent px-3 py-1.5 text-left transition-all hover:border-primary/10 hover:shadow-sm"
      onClick={() => setEditing(true)}
    >
      <h3 className="text-lg font-semibold capitalize">{titleState}</h3>
    </button>
  );
}
