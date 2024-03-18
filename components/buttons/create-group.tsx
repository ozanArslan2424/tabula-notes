"use client";
import { createNewGroup } from "@/actions/create";
import { GroupFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon, PlusCircleIcon, XCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { LoadingIcon2 } from "../ui/custom-loading";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

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
            className="flex h-min items-center gap-2 rounded-lg border bg-card p-2 shadow"
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
                      className="h-7 min-w-32"
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

            <Button
              type="reset"
              size="sm_icon"
              variant="custom_destructive"
              onClick={() => setOpen(false)}
            >
              <XCircleIcon size={14} />
            </Button>
          </form>
        </Form>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setOpen(true)}
          className="my-2"
          disabled={isPending}
        >
          {isPending ? (
            <LoadingIcon2 />
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
