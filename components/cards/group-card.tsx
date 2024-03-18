"use client";
import { deleteGroup } from "@/actions/delete";
import { updateGroupTitle } from "@/actions/update";
import { GroupType } from "@/lib/types";
import { CheckCircle2Icon, PencilLineIcon, XCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DeleteGroupButton } from "../buttons/delete-button";
import { DownloadGroupButton } from "../buttons/download-button";
import { NewNoteButton } from "../buttons/new-note";
import { Button } from "../ui/button";
import { LoadingIcon } from "../ui/custom-loading";
import { NoteCard } from "./note-card";

type NoteGroupCardProps = {
  group: GroupType;
  bookId: string;
};
export const NoteGroupTitleCard = ({ group, bookId }: NoteGroupCardProps) => {
  const [isPending, startTransition] = useTransition();
  const [titleState, setTitleState] = useState(group.title);
  const [editing, setEditing] = useState(false);

  const handleDeleteGroup = () => {
    startTransition(() => {
      deleteGroup({ groupId: group.id, bookId }).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
        }
      });
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateGroupTitle(group.id, titleState).then((data) => {
      if (data?.success) {
        setEditing(false);
      }
    });
  };

  const handleReset = () => {
    setTitleState(group.title);
    setEditing(false);
  };

  return (
    <div className="flex min-w-[400px] flex-col gap-2 sm:min-w-[600px]">
      {editing ? (
        <div className="mr-2 flex w-full items-center justify-between rounded-lg border bg-card p-2 shadow">
          <form onSubmit={handleSubmit} onReset={handleReset} className="flex items-center gap-2">
            <input
              autoFocus
              value={titleState}
              onChange={(e) => setTitleState(e.target.value)}
              className="mr-1 rounded-md border border-input bg-transparent pl-2 text-lg font-semibold capitalize outline-none ring-primary focus:ring-1"
            />
            <Button type="submit" size="sm_icon" variant="custom_submit" disabled={isPending}>
              {isPending ? <LoadingIcon size={14} /> : <CheckCircle2Icon size={14} />}
            </Button>
            <Button size="sm_icon" variant="custom_destructive">
              <XCircleIcon size={14} />
            </Button>
          </form>
        </div>
      ) : (
        <div className="mr-2 flex w-full items-center justify-between rounded-lg border bg-card px-4 py-2 shadow">
          <p className=" text-lg font-semibold capitalize">{titleState}</p>
          <div className="flex items-center gap-2">
            <DownloadGroupButton groupTitle={group.title} groupNotes={group.notes} />
            <Button
              size="sm_icon"
              variant="ghost"
              onClick={() => setEditing(true)}
              disabled={editing}
            >
              <PencilLineIcon size={14} />
            </Button>
            <DeleteGroupButton onClick={handleDeleteGroup} />
          </div>
        </div>
      )}
      {group.notes
        .sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
        .map((note) => {
          return <NoteCard key={note.id} bookId={bookId} groupId={group.id} note={note} />;
        })}
      <div className="flex w-full items-center justify-center">
        <NewNoteButton groupId={group.id} bookId={bookId} />
      </div>
    </div>
  );
};
