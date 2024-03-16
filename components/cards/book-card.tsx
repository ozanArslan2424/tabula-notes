"use client";
import { createNewBook } from "@/actions/create";
import { deleteBook } from "@/actions/delete";
import { changeBookProps } from "@/actions/update";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Book } from "@prisma/client";
import { CalendarIcon, MoreVerticalIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { LoadingIcon, LoadingIcon2 } from "../custom-loading";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  const [editState, setEditState] = useState(false);

  const [titleInput, setTitleInput] = useState(book.title);
  const [descriptionInput, setDescriptionInput] = useState(book.description || "");
  const [isPending, startTransition] = useTransition();

  const createdAtString = useMemo(() => book.createdAt.toLocaleDateString(), [book.createdAt]);
  const updatedAtString = useMemo(() => book.updatedAt.toLocaleDateString(), [book.updatedAt]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      changeBookProps({
        bookId: book.id,
        title: titleInput,
        description: descriptionInput,
      }).then(() => {
        setEditState(false);
      });
    });
  };

  const handleReset = () => {
    setTitleInput(book.title);
    setDescriptionInput(book.description || "");
    setEditState(false);
  };

  const handleDelete = () => {
    startTransition(() => {
      deleteBook({ bookId: book.id! });
    });
  };

  if (!editState) {
    return (
      <>
        {isPending ? (
          <Card className="relative flex w-[410px] items-center justify-center">
            <LoadingIcon />
          </Card>
        ) : (
          <Link
            href={`/dash/${book.id}`}
            key={book.id}
            className="rounded-lg ring-primary/50 transition-all hover:ring"
          >
            <Card className="relative flex w-[410px] flex-col items-start justify-between gap-4 p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                  <Button
                    size="sm_icon"
                    className="z-2 absolute right-2 top-2 border bg-transparent text-foreground shadow-none transition-all hover:bg-orange-500/90 hover:text-primary-foreground hover:text-white dark:hover:bg-orange-500/90"
                  >
                    <MoreVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setEditState(true);
                    }}
                  >
                    Düzenle
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onClick={(e) => e.preventDefault()}>Sil</DropdownMenuItem>
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
                          className="bg-destructive text-destructive-foreground hover:text-red-500"
                        >
                          Sil
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
              <CardHeader className="p-0">
                <CardTitle className="line-clamp-2 hyphens-auto text-wrap break-words pr-4 capitalize">
                  {book.title}
                </CardTitle>
                <CardDescription>{book.description}</CardDescription>
              </CardHeader>
              <CardFooter className="space-x-2 p-0">
                <Badge variant="custom_date">
                  <CalendarIcon size={14} />
                  <p className="text-xs">{createdAtString}</p>
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        )}
      </>
    );
  }

  if (editState) {
    return (
      <Card className="relative flex w-[410px] flex-col items-start justify-between gap-4 p-4 transition-all">
        <form onSubmit={handleSubmit} onReset={handleReset} className="flex h-24 w-full flex-col gap-2">
          <Input
            className="capitalize"
            type="text"
            id="title"
            name="title"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <Textarea
            className="h-full resize-none"
            id="description"
            name="description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button type="reset" size="sm" variant="custom_destructive" className="h-6">
              Vazgeç
            </Button>
            <Button type="submit" size="sm" variant="custom_submit" className="h-6">
              Kaydet
            </Button>
          </div>
        </form>
      </Card>
    );
  }
};

export const NewBookCard = () => {
  const [focus, setFocus] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  if (!user) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      createNewBook({
        title: titleInput,
        description: descriptionInput,
        userId: user.id!,
      }).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          setTitleInput("");
          setDescriptionInput("");
          setFocus(false);
        }
      });
    });
  };

  const handleReset = () => {
    setTitleInput("");
    setDescriptionInput("");
    setFocus(false);
  };
  return (
    <Card
      className={`flex w-[410px] items-center gap-4 transition-all ${
        focus
          ? "bg-background text-card-foreground"
          : "bg-muted/50 text-muted-foreground hover:bg-background hover:text-card-foreground"
      } border-transparent`}
    >
      {focus ? (
        <form onSubmit={handleSubmit} onReset={handleReset} className="flex w-full flex-col gap-2 p-4">
          <Input
            required
            className="capitalize"
            type="text"
            id="title"
            name="title"
            placeholder="Kitap Adı"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            autoFocus={focus}
          />
          <Textarea
            className="h-full resize-none"
            id="description"
            name="description"
            placeholder="Kitap Açıklaması"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />

          <div className="mt-2 flex justify-end gap-2">
            <Button type="reset" size="sm" variant="custom_destructive">
              Vazgeç
            </Button>
            <Button type="submit" size="sm" variant="custom_submit">
              {isPending ? <LoadingIcon2 size={8} /> : "Oluştur"}
            </Button>
          </div>
        </form>
      ) : (
        <div
          className="flex h-full w-full cursor-pointer items-center justify-center p-4"
          onClick={() => setFocus(true)}
        >
          <PlusCircleIcon size={32} />
          <p className="ml-4 text-lg font-semibold">Yeni Kitap</p>
        </div>
      )}
    </Card>
  );
};
