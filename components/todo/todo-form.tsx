"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewTask } from "@/lib/actions/create";
import { QuicknoteSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

export default function TodoForm({ bookId, userId }: { bookId: string; userId: string }) {
  const form = useForm<z.infer<typeof QuicknoteSchema>>({
    resolver: zodResolver(QuicknoteSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof QuicknoteSchema>) => {
    form.reset();
    createNewTask(userId, bookId, values.name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full items-center gap-2 py-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full min-w-max">
              <FormControl>
                <Input
                  {...field}
                  className="h-9 bg-background text-foreground"
                  type="text"
                  autoComplete="off"
                  name="todo"
                  id="todo"
                  placeholder="Yapılacak ekle"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" variant="outline" className="bg-background text-foreground">
          <span className="sr-only">Yapılacak ekle</span>
          <PlusCircleIcon size={14} className="shrink-0" />
        </Button>
      </form>
    </Form>
  );
}
