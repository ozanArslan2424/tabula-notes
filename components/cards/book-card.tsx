"use client";
import { deleteBook } from "@/actions/delete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Book } from "@prisma/client";
import { CalendarIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { LoadingIcon } from "../ui/custom-loading";

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const createdAtString = useMemo(() => book.createdAt.toLocaleDateString(), [book.createdAt]);

  const handleDelete = () => {
    startTransition(() => {
      deleteBook(book.id!);
    });
  };

  return (
    <>
      {isPending ? (
        <Card className="relative flex w-[360px] items-center justify-center">
          <LoadingIcon />
        </Card>
      ) : (
        <div className="relative mx-auto w-max">
          <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
            <AlertDialogTrigger asChild>
              <Button
                size="sm_icon"
                variant="ghost"
                className="z-2 absolute right-2 top-2 sm:sm:hover:bg-destructive sm:sm:hover:text-destructive-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(true);
                }}
              >
                <Trash2Icon size={14} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Kitabı sil.</AlertDialogTitle>
                <AlertDialogDescription>
                  Kitabı silmek istediğine emin misin? Bu işlem geri alınamaz.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground sm:hover:text-red-500"
                >
                  Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Link href={`/dash/${book.id}`} key={book.id}>
            <Card className="flex w-[360px] flex-col items-start justify-between gap-4 ring-primary/50 transition-all sm:hover:ring">
              <CardHeader>
                <CardTitle className="line-clamp-2 hyphens-auto text-wrap break-words capitalize">
                  {book.title}
                </CardTitle>
                <CardDescription>{book.description}</CardDescription>
              </CardHeader>
              <CardFooter className="space-x-2">
                <div className="inline-flex items-center justify-between gap-1 rounded-sm border bg-transparent px-2.5 py-0.5 text-right text-xs font-normal text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <CalendarIcon size={14} />
                  <p className="text-xs">{createdAtString}</p>
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      )}
    </>
  );
};
