"use client";
import { createNewNote } from "@/actions/create";
import { PlusCircleIcon } from "lucide-react";
import { useTransition } from "react";
import { LoadingIcon } from "../custom-loading";
import { Button } from "../ui/button";

export const NewNoteButton = ({ bookId, groupId }: { bookId: string; groupId: number }) => {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      createNewNote({
        bookId,
        groupId,
      });
    });
  }

  return (
    <Button size="sm" variant="secondary" disabled={isPending} onClick={handleClick}>
      {isPending ? (
        <>
          <LoadingIcon size={14} />
          <span className="ml-2">Ekleniyor...</span>
        </>
      ) : (
        <>
          <PlusCircleIcon size={14} />
          <span className="ml-2">Not ekle</span>
        </>
      )}
    </Button>
  );
};
