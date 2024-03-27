"use client";
import { CreateBookButton } from "@/components/book/book-form";
import { BookSettings } from "@/components/book/book-settings-form";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/custom-loading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/ui/link-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { createNewGroup, createNewNote } from "@/lib/actions/create";
import { GroupFormSchema } from "@/lib/schemas";
import { BookType } from "@/lib/types";
import { toSnakeCase } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CheckCircle2Icon, HomeIcon, PlusCircleIcon, TextIcon, XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const NotesButtons = ({ currentBook }: { currentBook: BookType }) => {
  const router = useRouter();
  const handleSelect = (value: string) => {
    const searchValueSnake = toSnakeCase(value);
    console.log(searchValueSnake);
    router.push(`#${searchValueSnake}`);
  };
  return (
    <nav className="mb-4 mt-2 flex flex-wrap justify-start gap-2 px-2 md:px-4">
      <LinkButton
        className="w-max justify-start space-x-3 bg-background text-foreground"
        size="sm"
        variant="outline"
        href="/dash"
      >
        <HomeIcon size={14} className="shrink-0" />
        <span className="hidden sm:inline">Kütüphane</span>
      </LinkButton>
      <CreateBookButton />
      <BookSettings currentBook={currentBook} />
      <Select name="redirect" onValueChange={(value) => handleSelect(value)}>
        <SelectTrigger className="h-8 w-max">
          <SelectValue placeholder="Gruba git" />
        </SelectTrigger>
        <SelectContent>
          {currentBook.groups.map((group) => (
            <SelectItem key={group.id} value={group.title} onClick={(e) => e.preventDefault()}>
              {group.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex h-8 w-max items-center gap-2 rounded-md border border-input px-3 text-xs font-semibold text-muted-foreground shadow-sm">
        <CalendarIcon size={14} className="shrink-0" />
        {currentBook.createdAt.toLocaleDateString()}
      </div>
      <div className="flex min-h-8 max-w-64 items-center gap-2 rounded-md border border-input px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
        <TextIcon size={14} className="shrink-0" />
        <p className="truncate">{currentBook.description}</p>
      </div>
    </nav>
  );
};

////////////////////////////////////////////////////////////////////////
//                              COMPONENTS                            //
////////////////////////////////////////////////////////////////////////

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

export const NewGroupButton = ({ bookId }: { bookId: string }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof GroupFormSchema>>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof GroupFormSchema>) => {
    setOpen(false);
    startTransition(() => {
      createNewGroup({ ...values, bookId }).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          form.reset();
        }
      });
    });
  };

  return (
    <>
      {open ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex h-12 items-center gap-2 border bg-accent p-2 shadow"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Grup adı"
                      className="h-7 min-w-32 bg-card"
                      disabled={isPending}
                      autoFocus={open}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" size="sm_icon" variant="custom_submit" disabled={isPending}>
              <CheckCircle2Icon size={14} />
            </Button>

            <Button type="reset" size="sm_icon" variant="custom_destructive" onClick={() => setOpen(false)}>
              <XCircleIcon size={14} />
            </Button>
          </form>
        </Form>
      ) : (
        <Button
          variant="secondary"
          onClick={() => setOpen(true)}
          className="aspect-square h-12 rounded-none border shadow"
          disabled={isPending}
        >
          {isPending ? <LoadingIcon size={14} /> : <PlusCircleIcon className="shrink-0" size={16} />}
        </Button>
      )}
    </>
  );
};
