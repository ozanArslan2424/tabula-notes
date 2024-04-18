"use client";
import { deleteGroup } from "@/lib/actions/delete";
import { updateGroupTitle } from "@/lib/actions/update";
import { GroupType } from "@/lib/types";
import { CheckCircle2Icon, PencilLineIcon, XCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DeleteGroupButton } from "./delete-button";
import { DownloadGroupButton } from "./download-button";

type NoteGroupCardProps = {
  group: GroupType;
  bookId: string;
};
export const NoteGroupTitleCard = ({ group, bookId }: NoteGroupCardProps) => {
  const [isPending, startTransition] = useTransition();
  const [titleState, setTitleState] = useState(group.title);
  const [error, setError] = useState(false);
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
    if (titleState === group.title) {
      setEditing(false);
      setError(false);
      return;
    }
    if (titleState === "") {
      toast.error("Grup adı boş olamaz");
      setError(true);
      return;
    }
    if (titleState.length < 2) {
      toast.error("Grup adı en az 2 karakter olmalı");
      setError(true);
      return;
    }
    if (titleState.length > 20) {
      toast.error("Grup adı en fazla 20 karakter olabilir");
      setError(true);
      return;
    }
    startTransition(() => {
      updateGroupTitle(group.id, titleState).then((data) => {
        if (data?.success) {
          setEditing(false);
          setError(false);
        }
      });
    });
  };

  return (
    <div className="sticky top-0 z-10 flex min-h-12 w-full items-center rounded-md border bg-accent px-4 shadow">
      {editing ? (
        <form onSubmit={handleSubmit} onReset={() => setEditing(false)} className="flex items-center gap-2">
          <Input
            autoFocus
            value={titleState}
            onChange={(e) => setTitleState(e.target.value)}
            className={error ? "border-destructive" : ""}
          />
          <Button type="reset" size="sm_icon" variant="custom_destructive" disabled={isPending}>
            <XCircleIcon size={14} />
          </Button>
          <Button type="submit" size="sm_icon" variant="custom_submit" disabled={isPending}>
            {isPending ? <LoadingIcon size={14} /> : <CheckCircle2Icon size={14} />}
          </Button>
        </form>
      ) : (
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold capitalize">{titleState}</p>

          <div className="flex items-center gap-2">
            <DownloadGroupButton groupTitle={group.title} groupNotes={group.notes} />
            <Button size="sm_icon" variant="ghost" onClick={() => setEditing(true)} disabled={editing}>
              <PencilLineIcon size={14} />
            </Button>
            <DeleteGroupButton onClick={handleDeleteGroup} />
          </div>
        </div>
      )}
    </div>
  );
};
