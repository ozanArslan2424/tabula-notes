"use client";
import { deleteGroup } from "@/actions/delete";
import { changeGroupTitle } from "@/actions/update";
import { GroupType } from "@/lib/types";
import { CheckCircle2Icon, MoreHorizontalIcon, PencilLineIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CancelButton } from "../buttons/action-btns";
import { DeleteGroupButton } from "../buttons/delete-button";
import { DownloadGroupButton } from "../buttons/download-button";
import { NewNoteButton } from "../buttons/new-note";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { TooltipSet } from "../ui/tooltip";

type NoteGroupCardProps = {
  group: GroupType;
  children: React.ReactNode;
  bookId: string;
};
export const NoteGroupCard = ({ group, children, bookId }: NoteGroupCardProps) => {
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

  const saveTitle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeGroupTitle(group.id, titleState).then((data) => {
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        setEditing(false);
      }
    });
  };

  const handleCancel = () => {
    setTitleState(group.title);
    setEditing(false);
  };

  return (
    <div className="flex min-w-[400px] flex-col gap-2 sm:min-w-[600px]">
      <div className="mr-2 flex w-full items-center justify-between rounded-lg border bg-card p-2 shadow">
        {editing ? (
          <form onSubmit={saveTitle} className="flex items-center gap-2">
            <Input
              autoFocus
              value={titleState}
              onChange={(e) => setTitleState(e.target.value)}
              className="styles-none w-fit pl-2 text-lg font-semibold capitalize focus:ring-0"
            />
            <TooltipSet text="Onay">
              <Button type="submit" size="sm_icon" variant="custom_submit" disabled={isPending}>
                {isPending ? <LoadingIcon size={14} /> : <CheckCircle2Icon size={14} />}
              </Button>
            </TooltipSet>
            <CancelButton onClick={handleCancel} />
          </form>
        ) : (
          <p className="pl-2 text-lg font-semibold capitalize">{titleState}</p>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm_icon" variant="custom_action" disabled={isPending}>
              {isPending ? <LoadingIcon size={14} /> : <MoreHorizontalIcon size={14} />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DownloadGroupButton groupTitle={group.title} groupNotes={group.notes} />

            <DropdownMenuItem className="space-x-2" onClick={() => setEditing(true)}>
              <PencilLineIcon size={14} />
              <span>Grup adını değiştir</span>
            </DropdownMenuItem>

            <DeleteGroupButton onClick={handleDeleteGroup} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
      <div className="flex w-full items-center justify-center">
        <NewNoteButton groupId={group.id} bookId={bookId} />
      </div>
    </div>
  );
};
