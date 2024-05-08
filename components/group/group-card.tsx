"use client";
import { deleteGroup } from "@/lib/actions/delete";
import { GroupType } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteGroupButton } from "./delete-button";
import { DownloadGroupButton } from "./download-button";
import { EditGroup } from "./edit-group";

export const NoteGroupTitleCard = ({ group, bookId }: { group: GroupType; bookId: string }) => {
  const [title, setTitle] = useState(group.title);

  const handleDeleteGroup = () => {
    deleteGroup(group.id, bookId).then((data) => {
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
      }
    });
  };

  return (
    <div className="card accent sticky top-0 z-10">
      <h3 className="text-lg font-semibold capitalize">{title}</h3>
      <div className="flex items-center gap-2">
        <DownloadGroupButton groupTitle={group.title} groupNotes={group.notes} />
        <EditGroup groupId={group.id} groupTitle={title} setTitle={setTitle} />
        <DeleteGroupButton onClick={handleDeleteGroup} />
      </div>
    </div>
  );
};
