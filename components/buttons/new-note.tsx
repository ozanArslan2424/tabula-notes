"use client";
import { createNewNote } from "@/actions/create";
import { PlusCircleIcon } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { LoadingIcon } from "../ui/custom-loading";

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
