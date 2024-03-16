"use client";
import { createNewGroup } from "@/actions/create";
import { CheckCircle2Icon, PlusCircleIcon, XCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { LoadingIcon2 } from "../custom-loading";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TooltipSet } from "../ui/tooltip";

export const NewGroupButton = ({ bookId }: { bookId: string }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      createNewGroup({ bookId, title }).then((data) => {
        if (data?.success) {
          setTitle("");
          setOpen(false);
        }
      });
    });
  };

  return (
    <>
      {open ? (
        <form
          className="flex h-min items-center gap-2 rounded-lg border bg-card p-2 shadow"
          onSubmit={handleSubmit}
        >
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Grup adı"
            className="h-7 min-w-32"
            disabled={isPending}
            autoFocus={open}
          />
          <TooltipSet text="Onay">
            <Button type="submit" size="sm_icon" variant="custom_submit" disabled={isPending}>
              <CheckCircle2Icon size={14} />
            </Button>
          </TooltipSet>
          <TooltipSet text="Vazgeç">
            <Button
              type="reset"
              size="sm_icon"
              variant="custom_destructive"
              onClick={() => setOpen(false)}
            >
              <XCircleIcon size={14} />
            </Button>
          </TooltipSet>
        </form>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setOpen(true)}
          className="my-2"
          disabled={isPending}
        >
          {isPending ? (
            <LoadingIcon2 size={10} />
          ) : (
            <span className="flex items-center gap-2">
              <PlusCircleIcon size={14} /> Grup Ekle
            </span>
          )}
        </Button>
      )}
    </>
  );
};
