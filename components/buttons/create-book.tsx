"use client";
import { createNewBook } from "@/actions/create";
import { useCurrentUser } from "@/hooks/use-current-user";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { LoadingIcon2 } from "../custom-loading";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

type Props = {};

export const CreateBookButton = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      createNewBook({
        title,
        description: description,
        userId: user?.id!,
      }).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          setTitle("");
          setOpen(false);
          router.push(`/dash/${data.id}`);
        }
      });
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-7 bg-background text-foreground">
          <PlusCircleIcon className="mr-2" size={14} />
          Yeni kitap
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-80">
        <DialogHeader>Yeni Kitap Oluştur</DialogHeader>
        <DialogDescription>Kitap adı 2-100 karakter arasında olmalı.</DialogDescription>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Kitap adı"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            disabled={isPending}
          />
          <Input
            placeholder="Kısa bir açıklama"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            disabled={isPending}
          />
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? <LoadingIcon2 /> : "Kitap Oluştur"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
