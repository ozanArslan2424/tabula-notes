"use client";
import { LoadingIcon } from "@/components/custom-loading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNewNote } from "@/lib/actions/create";
import { NoteFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function CreateNoteButton({ bookId }: { bookId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NoteFormSchema>>({
    resolver: zodResolver(NoteFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof NoteFormSchema>) => {
    setOpen(false);
    startTransition(() => {
      createNewNote(values, bookId).then((data) => {
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

  if (open)
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-80 min-w-80 flex-col justify-center gap-2 border-b border-r border-primary/10 bg-accent px-6 py-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-md font-semibold">Not Başlığı</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border border-primary text-accent-foreground "
                    disabled={isPending}
                    autoFocus={open}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" size="sm" disabled={isPending} className="mt-2">
            Oluştur
          </Button>

          <Button
            type="reset"
            size="sm"
            variant="secondary"
            className="hover:bg-primary/10"
            onClick={() => setOpen(false)}
          >
            Vazgeç
          </Button>
        </form>
      </Form>
    );

  return (
    <button
      onClick={() => setOpen(true)}
      className="flex w-20 min-w-20 items-center justify-center hover:bg-muted/20"
      disabled={isPending}
    >
      {isPending ? <LoadingIcon size={14} /> : <PlusCircleIcon className="shrink-0" size={20} />}
    </button>
  );
}
