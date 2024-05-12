"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createQuicknote } from "@/lib/actions/create";
import { QuicknoteSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

export default function QuickNoteForm({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof QuicknoteSchema>>({
    resolver: zodResolver(QuicknoteSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof QuicknoteSchema>) => {
    form.reset();
    createQuicknote(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full min-w-max">
              <FormControl>
                <Input
                  {...field}
                  className="h-9 bg-background text-foreground"
                  placeholder="Hızlıca bir şeyler yazın..."
                  type="text"
                  autoComplete="off"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" variant="outline" className="bg-background text-foreground">
          <span className="sr-only">Hızlı not ekle</span>
          <PlusCircleIcon size={14} className="shrink-0" />
        </Button>
      </form>
    </Form>
  );
}
