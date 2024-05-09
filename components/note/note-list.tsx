"use client";
import { GroupType } from "@/lib/types";
import { toSnakeCase } from "@/lib/utils";
import { useMemo } from "react";
import { NoteGroupTitleCard } from "../group/group-card";
import { NewNoteButton } from "./create-note";
import { NoteCard } from "./note-item";

type Props = {
  bookId: string;
  groups: GroupType[];
};

export default function NoteList({ bookId, groups }: Props) {
  const groupsMemo = useMemo(
    () =>
      groups.map((group) => {
        return {
          ...group,
        };
      }),
    [groups],
  );

  return (
    <>
      {groupsMemo
        .sort((a, b) => a.id - b.id)
        .map((group) => {
          const notes = group.notes;
          const groupIdSnake = toSnakeCase(group.title);

          return (
            <div
              id={groupIdSnake}
              key={group.id}
              className="flex h-full w-[360px] shrink-0 flex-col gap-2 overflow-y-scroll sm:w-[576px]"
            >
              <NoteGroupTitleCard group={group} bookId={bookId} />
              {notes
                .sort((a, b) => a.id - b.id)
                .map((note) => (
                  <NoteCard key={note.id} bookId={bookId} groupId={group.id} note={note} />
                ))}
              <div className="flex w-full items-center justify-center pb-12">
                <NewNoteButton groupId={group.id} bookId={bookId} />
              </div>
            </div>
          );
        })}
    </>
  );
}
